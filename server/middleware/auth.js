const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const AppError = require('../classes/AppError')
const User = mongoose.model('User')

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      req.isAuthenticated = false
      return next()
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      req.isAuthenticated = false
      return next()
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(userId)
    if (!user) return next()

    req.user = user
    req.isAuthenticated = true

    next()
  } catch (err) {
    next(err)
  }
}

exports.isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated) {
    throw new AppError('Not authenticated', 401)
  }
  next()
}
