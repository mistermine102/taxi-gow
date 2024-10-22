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

  //get drivers
  const drivers = await User.find({ roles: 'driver', isAvailable: true })

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
    //(total distance is in meters, we convert it to km)
    //distance is driverToClient + clientToDestination
    const distance = parseFloat(((routeDistance.value) / 1000).toFixed(1))
    const totalCost = calculateTotalCost(driver.pricing, distance)

    tranformedDrivers.push({
      _id: driver._id,
      distance: row.distance,
      duration: row.duration,
      cost: {
        total: totalCost,
        initialCost: driver.pricing.initialCost,
        perKm: driver.pricing.perKm,
        totalKm: distance,
        currency: driver.pricing.currency,
      },
    })
  }

  tranformedDrivers.sort((a, b) => a.duration.value - b.duration.value)

  ///send response
  res.json({
    drivers: tranformedDrivers,
    route: {
      distance: routeDistance,
      duration: routeDuration,
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
