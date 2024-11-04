const mongoose = require('mongoose')
const User = mongoose.model('User')
const calculateDistances = require('../utils/calculateDistances')
const calculateTotalCost = require('../utils/calculateTotalCost')
const AppError = require('../classes/AppError')

exports.getDrivers = async (req, res) => {
  //receive information about client's origin
  //origin and destination in format "37.223,17.998"
  const { origin: clientOrigin, destination } = req.query

  const routeDistanceData = await calculateDistances([clientOrigin], [destination])
  const { distance: routeDistance, duration: routeDuration } = routeDistanceData.rows[0].elements[0]

  const routeDistanceInKm = parseFloat((routeDistance.value / 1000).toFixed(1))
  const routeDurationInMinutes = Math.ceil(routeDuration.value / 60)

  //get drivers
  const drivers = await User.find({ roles: 'driver', isAvailable: true })

  if (!drivers.length) {
    return res.json({
      drivers: [],
      route: {
        distance: routeDistanceInKm,
        duration: routeDurationInMinutes,
      },
    })
  }

  //calculate distance and travel time for each driver
  const origins = []

  for (const driver of drivers) {
    const { latitude: driverLatitude, longitude: driverLongitude } = driver.currentLocation.coords
    origins.push(`${driverLatitude}, ${driverLongitude}`)
  }

  const distancesData = await calculateDistances(origins, [clientOrigin])

  //sort driver's by their travel time to client's origin
  //transformed drivers are driver's that will be sent to the client (stripped from info like password etc)
  const tranformedDrivers = []

  for (let i = 0; i < drivers.length; i++) {
    const driver = drivers[i]
    const row = distancesData.rows[i].elements[0]

    //calculate drivers cost
    //distance is driverToClient + clientToDestination
    const totalCost = calculateTotalCost(driver.pricing, routeDistanceInKm)
    const waitTimeInMinutes = Math.ceil(row.duration.value / 60)
    const distanceFromClientInKm = parseFloat((row.distance.value / 1000).toFixed(1))

    tranformedDrivers.push({
      name: driver.name,
      _id: driver._id,
      vehicle: driver.vehicle,
      waitTime: waitTimeInMinutes,
      distanceFromClient: distanceFromClientInKm,
      cost: {
        total: totalCost,
        initialCost: driver.pricing.initialCost,
        perKm: driver.pricing.perKm,
        totalKm: routeDistanceInKm,
        currency: driver.pricing.currency,
      },
    })
  }

  tranformedDrivers.sort((a, b) => a.waitTime - b.waitTime)

  ///send response
  res.json({
    drivers: tranformedDrivers,
    route: {
      distance: routeDistanceInKm,
      duration: routeDurationInMinutes,
      clientOriginAddress: routeDistanceData.origin_addresses[0],
      destinationAddress: routeDistanceData.destination_addresses[0],
    },
  })
}

exports.getAllDrivers = async (req, res) => {
  const drivers = await User.find({ roles: 'driver' })

  //remove passwords before being sent
  const transformedDrivers = []

  for (const driver of drivers) {
    const driverDoc = driver._doc
    delete driverDoc.password

    transformedDrivers.push({
      ...driverDoc,
    })
  }

  res.json({ drivers: transformedDrivers })
}

exports.getDriverLocation = async (req, res) => {
  const { driverId } = req.query
  const driver = await User.findById(driverId)
  if (!driver) throw new AppError('No driver found', 400)

  const { latitude, longitude } = driver.currentLocation.coords

  res.json({
    location: {
      latitude,
      longitude,
    },
  })
}
