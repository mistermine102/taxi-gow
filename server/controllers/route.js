const mongoose = require('mongoose')
const Route = mongoose.model('Route')

exports.createRoute = async (req, res) => {
  //validate route creation
  //todo

  const { origin, waypoints = [], destination, driverId, totalPrice, estimatedDurationInSeconds, estimatedWaitingTimeInSeconds } = req.body

  return res.json({
    origin,
    waypoints,
    destination,
    clientId: req.user._id,
    driverId,
    estimatedWaitingTimeInSeconds,
    estimatedDurationInSeconds,
  })

  const newRoute = new Route({
    clientId: req.user._id,
    driverId,
    clientOrigin: origin,
    driverOrigin: null,
    destination: destination,
    waypoints,
    totalLength: null,
    totalPrice,
    statusId: 1,
    history: [],
    waitingTimeInSeconds: {
      estimated: estimatedWaitingTimeInSeconds,
      actual: null,
    },
    durationInSeconds: {
      estimated: estimatedDurationInSeconds,
      actual: null,
    },
  })

  await newRoute.save()
}
