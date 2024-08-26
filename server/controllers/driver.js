const mongoose = require('mongoose')
const User = mongoose.model('User')
const { Client } = require('@googlemaps/google-maps-services-js')

exports.getDrivers = async (req, res) => {
  //receive information about client's origin
  const { latitude: clientLatitude, longitude: clientLongitude } = req.query

  //get drivers
  const drivers = await User.find({ role: 'driver' })

  //calculate distance and travel time for each driver
  const client = new Client()
  const origins = []

  for (const driver of drivers) {
    const { latitude: driverLatitude, longitude: driverLongitude } = driver.currentLocation.coords
    origins.push(`${driverLatitude}, ${driverLongitude}`)
  }

  const response = await client.distancematrix({
    params: {
      origins,
      destinations: [`${clientLatitude},${clientLongitude}`],
      units: 'metric',
      key: process.env.GOOGLE_API_KEY,
    },
  })

  //sort driver's by their travel time to client's origin
  const tranformedDrivers = []

  for (let i = 0; i < drivers.length; i++) {
    const driver = drivers[i]
    const row = response.data.rows[i].elements[0]

    tranformedDrivers.push({
      _id: driver._id,
      distance: row.distance,
      duration: row.duration,
    })
  }

  tranformedDrivers.sort((a, b) => a.duration.value - b.duration.value)

  ///send response
  res.json({ drivers: tranformedDrivers })
}
