const mongoose = require('mongoose')
const User = mongoose.model('User')
const calculateDistances = require('../utils/calculateDistances')
const calculateTotalCost = require("../utils/calculateTotalCost")

exports.getDrivers = async (req, res) => {
  //receive information about client's origin
  //origin and destination in format "37.223,17.998"
  const { origin: clientOrigin, destination } = req.query

  const routeDistanceData = await calculateDistances([clientOrigin], [destination])
  const { distance: routeDistance, duration: routeDuration } = routeDistanceData.rows[0].elements[0]

  //get drivers
  const drivers = await User.find({ role: 'driver' })

  //calculate distance and travel time for each driver
  const origins = []

  for (const driver of drivers) {
    const { latitude: driverLatitude, longitude: driverLongitude } = driver.currentLocation.coords
    origins.push(`${driverLatitude}, ${driverLongitude}`)
  }

  const distancesData = await calculateDistances(origins, [clientOrigin])

  //sort driver's by their travel time to client's origin
  const tranformedDrivers = []

  for (let i = 0; i < drivers.length; i++) {
    const driver = drivers[i]
    const row = distancesData.rows[i].elements[0]

    //calculate drivers cost
    //(total distance is in meters, we convert it to km)
    const totalDistance = parseFloat(((row.distance.value + routeDistance.value) / 1000).toFixed(1))
    const totalCost = calculateTotalCost(driver.pricing, totalDistance)

    tranformedDrivers.push({
      _id: driver._id,
      distance: row.distance,
      duration: row.duration,
      cost: {
        total: totalCost,
        initialCost: driver.pricing.initialCost,
        perKm: driver.pricing.perKm,
        totalKm: totalDistance,
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


