const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const AppError = require('../classes/AppError')
const User = mongoose.model('User')

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    req.isAuthenticated = false

    //no Authorization header present
    if (!authHeader) return next()

    //Authorization header present but has invalid form
    const token = authHeader.split(' ')[1]
    if (!token) return next()

    //token verified, userId extracted, but no user with that id
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(userId)
    if (!user) return next()

    //Authorization header with valid form present, token verified, found user with id extracted from the token
    //user authenticated
    req.user = user
    req.isAuthenticated = true

    next()
  } catch (err) {
    next(err)
  }
}

exports.isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated) throw new AppError('Not authenticated', 401)
  next()
}

exports.isDriver = (req, res, next) => {
  if (!req.user.roles.includes('driver')) throw new AppError('Not a driver', 401)
  next()
}
