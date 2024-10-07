const mongoose = require('mongoose')
const AppError = require('../classes/AppError')
const Route = mongoose.model('Route')
const User = mongoose.model('User')

exports.getRoute = async (req, res) => {
  const route = await Route.findOne({ [req.user.role === 'client' ? 'clientId' : 'driverId']: req.user._id })

  res.json({ route })
}

exports.getRouteDriverLocation = async (req, res) => {
  const route = await Route.findOne({ clientId: req.user._id }).populate('driverId')

  const { latitude, longitude } = route.driverId.currentLocation.coords

  res.json({ coords: { latitude, longitude } })
}

exports.getAvailability = async (req, res) => {
  const { hasActiveRoute, isAvailable } = req.user
  res.json({ hasActiveRoute, isAvailable })
}

exports.toggleAvailability = async (req, res) => {
  if (req.user.hasActiveRoute) throw new AppError("Can't change availability when have an active route", 400)

  await User.findByIdAndUpdate(req.user._id, { isAvailable: !req.user.isAvailable })

  res.json(req.user)
}

exports.updateCurrentLocation = async (req, res) => {
  const { location } = req.body

  const user = await User.findByIdAndUpdate(req.user._id, { currentLocation: location }, { new: true })

  res.json({ location: user.currentLocation })
}
