const mongoose = require('mongoose')
const AppError = require('../classes/AppError')
const Route = mongoose.model('Route')
const ArchivedRoute = mongoose.model("ArchivedRoute")
const User = mongoose.model('User')

exports.getRoute = async (req, res) => {
  const route = await Route.findById(req.user.activeRoute)

  res.json({ route })
}

exports.getRouteDriverLocation = async (req, res) => {
  const route = await Route.findById(req.user.activeRoute)
  if (!route) throw new AppError('No route found', 400)
  const driver = await User.findById(route.driver._id)

  const { latitude, longitude } = driver.currentLocation.coords

  res.json({ coords: { latitude, longitude } })
}

exports.getAvailability = async (req, res) => {
  const { activeRoute, isAvailable } = req.user

  res.json({ hasActiveRoute: !!activeRoute, isAvailable })
}

exports.toggleAvailability = async (req, res) => {
  if (req.user.activeRoute) throw new AppError("Can't change availability when have an active route", 400)

  await User.findByIdAndUpdate(req.user._id, { isAvailable: !req.user.isAvailable })

  res.json(req.user)
}

exports.updateCurrentLocation = async (req, res) => {
  const { location } = req.body

  const user = await User.findByIdAndUpdate(req.user._id, { currentLocation: location }, { new: true })

  res.json({ location: user.currentLocation })
}

exports.getRoutes = async (req, res) => {
  const routes = await ArchivedRoute.find({ _id: { $in: req.user.routes } })
  res.json({ routes })
}
