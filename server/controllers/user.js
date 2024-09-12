const mongoose = require('mongoose')
const Route = mongoose.model('Route')

exports.getRoute = async (req, res) => {
  const route = await Route.findOne({ [req.user.role === 'client' ? 'clientId' : 'driverId']: req.user._id })

  res.json({ route })
}

exports.getRouteDriverLocation = async (req, res) => {
  const route = await Route.findOne({ clientId: req.user._id }).populate('driverId')

  const { latitude, longitude } = route.driverId.currentLocation.coords

  res.json({coords: { latitude, longitude }})
}
