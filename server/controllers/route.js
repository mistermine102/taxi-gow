const mongoose = require('mongoose')
const Route = mongoose.model('Route')
const ArchivedRoute = mongoose.model('ArchivedRoute')
const User = mongoose.model('User')
const calculateDistances = require('../utils/calculateDistances')
const AppError = require('../classes/AppError')
const parseCoords = require('../utils/parseCoords')
const calculateTotalCost = require('../utils/calculateTotalCost')

exports.createRoute = async (req, res) => {
  //1. server gets origin, destination and driverId from client (done)
  //2. server calculates route's price based on those 3 pieces of information (done)
  //3. server creates payment and sends payment id to the client
  //4. when payment with that id get's paid, server creates a route

  //check if user which is trying to create a route doesn't have an active route
  const foundRoute = await Route.findOne({ clientId: req.user._id })
  if (foundRoute) throw new AppError('This user has an active route', 400)

  //extract and parse data from request
  const { clientOrigin, destination, driverId } = req.body

  const [clientLatitude, clientLongitude] = parseCoords(clientOrigin)
  const [destinationLatitude, destinationLongitude] = parseCoords(destination)

  //check if driver with that id exists and is free
  const foundDriver = await User.findById(driverId)
  if (!foundDriver) throw new AppError('Cannot find driver with that id', 400)

  const { latitude: driverLatitude, longitude: driverLongitude } = foundDriver.currentLocation.coords
  const driverOrigin = `${driverLatitude}, ${driverLongitude}`

  //calculate distances
  const distancesData = await calculateDistances([clientOrigin, driverOrigin], [destination, clientOrigin])

  const clientAddress = distancesData.origin_addresses[0]
  const driverAddress = distancesData.origin_addresses[1]
  const destinationAddress = distancesData.destination_addresses[0]

  const clientToDestination = distancesData.rows[0].elements[0]
  const driverToClient = distancesData.rows[1].elements[1]

  //determine route's total length
  const totalDistanceMeters = driverToClient.distance.value + clientToDestination.distance.value
  const totalDistanceKm = parseFloat((totalDistanceMeters / 1000).toFixed(1))

  //determine route's total price
  const totalCost = calculateTotalCost(foundDriver.pricing, totalDistanceKm)

  //determine estimated duration
  const totalSeconds = driverToClient.duration.value + clientToDestination.duration.value
  const totalMinutes = Math.ceil(totalSeconds / 60)

  const newRoute = new Route({
    clientId: req.user._id,
    driverId,
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
    totalDistance: totalDistanceKm,
    totalCost,
    statusId: 1,
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
  })

  await newRoute.save()

  res.json({ route: newRoute })
}

exports.changeRouteStatus = async (req, res) => {
  const { routeId } = req.params
  const { newStatusId } = req.body

  const route = await Route.findById(routeId)

  //check if user is the driver of the route
  if (!route.driverId.equals(req.user._id)) throw new AppError("Can't modify this route", 401)

  switch (newStatusId) {
    case 1:
      //route when created has a statusId === 1
      break
    case 2:
      //route started
      route.meta.startedAt = new Date()
      route.statusId = 2
      break
    case 3:
      //client picked up
      route.statusId = 3
      route.meta.clientPickedUpAt = new Date()
      break
    case 4:
      //client dropped off
      route.statusId = 4
      route.meta.clientDroppedOffAt = new Date()
      break
    case 5:
      //route finished
      route.statusId = 5
      route.meta.finishedAt = new Date()

      //caclulate actual route duration
      //finishedAt - startedAt
      const actualDurationInMiliseconds = Math.abs(route.meta.finishedAt - route.meta.startedAt)
      const actualDurationInMinutes = Math.ceil(actualDurationInMiliseconds / 1000 / 60)
      route.duration.actual = parseInt(actualDurationInMinutes)

      //push the route to the archives
      const archivedRoute = new ArchivedRoute({
        ...route._doc,
      })

      await archivedRoute.save()

      break
    default:
      break
  }

  newStatusId === 5 ? await route.deleteOne() : await route.save()

  res.json({ route })
}
