const mongoose = require('mongoose')
const Route = mongoose.model('Route')
const User = mongoose.model('User')
const Status = mongoose.model('Status')
const calculateDistances = require('../utils/calculateDistances')
const AppError = require('../classes/AppError')
const parseCoords = require('../utils/parseCoords')
const calculateTotalCost = require('../utils/calculateTotalCost')
const emitWsEvent = require('../utils/emitWsEvent')
const moveRouteToArchives = require('../utils/moveRouteToArchives')

exports.createRoute = async (req, res) => {
  //1. server gets origin, destination and driverId from client (done)
  //2. server calculates route's price based on those 3 pieces of information (done)
  //3. server creates payment and sends payment id to the client
  //4. when payment with that id get's paid, server creates a route

  //check if user which is trying to create a route doesn't have an active route
  //SKIP THIS STEP IF ROUTE IS CREATED MANUALLY
  if (!req.createdManually) {
    if (req.user.activeRoute) throw new AppError('This user has an active route', 400)
  }

  //extract and parse data from request
  const { clientOrigin, destination, driverId } = req.body

  const [clientLatitude, clientLongitude] = parseCoords(clientOrigin)
  const [destinationLatitude, destinationLongitude] = parseCoords(destination)

  //check if driver with that id exists and is free
  const foundDriver = await User.findById(driverId)
  if (!foundDriver) throw new AppError('Cannot find driver with that id', 400)
  if (!foundDriver.isAvailable) throw new AppError('Driver not available', 400)

  const { latitude: driverLatitude, longitude: driverLongitude } = foundDriver.currentLocation.coords
  const driverOrigin = `${driverLatitude}, ${driverLongitude}`

  //calculate distances
  const distancesData = await calculateDistances([clientOrigin, driverOrigin], [destination, clientOrigin])

  const clientAddress = distancesData.origin_addresses[0]
  const driverAddress = distancesData.origin_addresses[1]
  const destinationAddress = distancesData.destination_addresses[0]

  const clientToDestination = distancesData.rows[0].elements[0]
  const driverToClient = distancesData.rows[1].elements[1]

  const driverToClientKm = parseFloat((driverToClient.distance.value / 1000).toFixed(1))
  const clientToDestinationKm = parseFloat((clientToDestination.distance.value / 1000).toFixed(1))
  const totalDistanceKm = parseFloat(driverToClientKm + clientToDestinationKm).toFixed(1)

  //determine route's total price
  const totalCost = calculateTotalCost(foundDriver.pricing, clientToDestinationKm)

  //determine estimated duration
  const totalSeconds = driverToClient.duration.value + clientToDestination.duration.value
  const totalMinutes = Math.ceil(totalSeconds / 60)

  //find route status
  const status = await Status.findById(1)

  //if a route is created manually by admin there is no actuaal client in a database thus we can only store phoneNumber provided by an admin
  const routeClient = req.createdManually
    ? { phoneNumber: req.body.clientPhoneNumber }
    : {
        _id: req.user._id,
        phoneNumber: req.user.phoneNumber,
      }

  //generate verification code
  const verificationCode = Math.random().toFixed(4).toString().split('.')[1]

  const newRoute = new Route({
    client: routeClient,
    driver: {
      _id: foundDriver._id,
      phoneNumber: foundDriver.phoneNumber,
      name: foundDriver.name,
      licensePlate: foundDriver.licensePlate,
    },
    clientOrigin: {
      latitude: clientLatitude,
      longitude: clientLongitude,
      address: clientAddress,
    },
    driverOrigin: {
      latitude: driverLatitude,
      longitude: driverLongitude,
      address: driverAddress,
    },
    destination: {
      latitude: destinationLatitude,
      longitude: destinationLongitude,
      address: destinationAddress,
    },
    distance: {
      driverToClient: driverToClientKm,
      clientToDestination: clientToDestinationKm,
      total: totalDistanceKm,
    },
    totalCost,
    status,
    history: [],
    duration: {
      estimated: totalMinutes,
      actual: null,
    },
    meta: {
      createdAt: new Date(),
      startedAt: null,
      clientPickedUpAt: null,
      clientDroppedOffAt: null,
      finishedAt: null,
    },
    verificationCode,
    creationMethod: req.createdManually ? 'manual' : 'app',
  })

  await newRoute.save()

  //change driver's isAvailable and active route
  foundDriver.isAvailable = false
  foundDriver.activeRoute = newRoute._id
  foundDriver.routes.push(newRoute._id)
  await foundDriver.save()

  //WE CAN CHANGE CLIENT'S ACTIVE ROUTE ONLY IF ROUTE ISN'T CREATED MANUALLY
  //BEACUSE ONLY THEN WE HAVE AN ACTUAL CLIENT IN DATABASE
  let client

  if (!req.createdManually) {
    client = await User.findById(newRoute.client._id)
    client.activeRoute = newRoute._id
    client.routes.push(newRoute._id)
    await client.save()
  }

  //if route is created manually we have no actual client in database and we can't emit ws event to him
  const wsUsers = req.createdManually ? [foundDriver] : [foundDriver, client]

  //emit websocket updates
  emitWsEvent({ name: 'routeCreated', payload: newRoute }, wsUsers)

  //emit websocket events to all connected admins
  const admins = await User.find({ roles: 'admin', 'websocket.isConnected': true })
  emitWsEvent({ name: 'adminRouteCreated', payload: newRoute }, admins)
  res.json({ route: newRoute })
}

exports.changeRouteStatus = async (req, res) => {
  const { routeId } = req.params
  const { newStatusId } = req.body

  const route = await Route.findById(routeId)
  let client

  if (!route) throw new AppError("Can't find route", 400)

  //client will be undefined if route was created manually
  if (route.creationMethod !== 'manual') {
    client = await User.findById(route.client._id)
  }
  const driver = await User.findById(route.driver._id)

  //check if user is the driver of the route
  if (!route.driver._id.equals(req.user._id)) throw new AppError("Can't modify this route", 401)

  //update route status
  const status = await Status.findById(newStatusId)
  route.status = status

  switch (newStatusId) {
    case 1:
      //route when created has a statusId === 1
      break
    case 2:
      //route started
      route.meta.startedAt = new Date()
      break
    case 3:
      //client picked up
      route.meta.clientPickedUpAt = new Date()
      break
    case 4:
      //client dropped off
      route.meta.clientDroppedOffAt = new Date()
      break
    case 5:
      //route finished
      route.meta.finishedAt = new Date()

      //caclulate actual route duration
      //finishedAt - startedAt
      const actualDurationInMiliseconds = Math.abs(route.meta.finishedAt - route.meta.startedAt)
      const actualDurationInMinutes = Math.ceil(actualDurationInMiliseconds / 1000 / 60)
      route.duration.actual = parseInt(actualDurationInMinutes)

      await moveRouteToArchives(route, client, driver)
      break
    case 100:
      //route canceled
      route.meta.canceledAt = new Date()
      await moveRouteToArchives(route, client, driver)
    default:
      break
  }

  //save route (only if it hasn't been archived)
  if (newStatusId !== 5 && newStatusId !== 100) {
    await route.save()
  }

  //websocket event
  const wsUsers = route.creationMethod === 'manual' ? [driver] : [driver, client]
  emitWsEvent({ name: 'routeStatusChanged', payload: status }, wsUsers)

  //emit websocket events to all connected admins
  const admins = await User.find({ roles: 'admin', 'websocket.isConnected': true })
  emitWsEvent({ name: 'adminRouteChanged', payload: route }, admins)

  res.json({ route })
}

exports.getAllRoutes = async (req, res) => {
  const routes = await Route.find()

  res.json({ routes })
}

exports.getRoutePreview = async (req, res) => {
  const { origin, destination, driverId } = req.query

  //calculate distance and duration
  const distancesData = await calculateDistances([origin], [destination])
  const { distance, duration } = distancesData.rows[0].elements[0]
  const distanceInKm = parseFloat((distance.value / 1000).toFixed(1))
  const durationInMinutes = Math.round(duration.value / 60)

  //check if driver is available and calculate cost
  const driver = await User.findById(driverId)
  if (!driver.isAvailable) throw new AppError('Driver not available', 400)
  const cost = calculateTotalCost(driver.pricing, distanceInKm)

  res.json({
    routePreview: {
      distance: distanceInKm,
      duration: durationInMinutes,
      cost,
    },
  })
}
