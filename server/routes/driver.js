const express = require('express')
const { getDrivers } = require('../controllers/driver')
const { isAuthenticated } = require('../middleware/auth')
const { query } = require('express-validator')
const validate = require('../middleware/validate')
const tryCatch = require('../utils/tryCatch')

const router = express.Router()

const validateCoords = value => {
  if (typeof value !== 'string') throw new Error('Coordinates must be a string')

  const [latitudeStr, longitudeStr] = value.split(',')
  if (!latitudeStr || !longitudeStr) throw new Error('Invalid coordinates format')

  const latitude = parseFloat(latitudeStr)
  const longitude = parseFloat(longitudeStr)
  if (typeof latitude !== 'number' || typeof longitude !== 'number') throw new Error('Invalid coordinates value')
  if (latitude < -90 || latitude > 90) throw new Error('Invalid latitude value')
  if (longitude < -180 || longitude > 180) throw new Error('Invalid latitude value')

  return true
}

const getDriversValidators = [query('origin').notEmpty().custom(validateCoords), query('destination').notEmpty().custom(validateCoords)]

router.get('/', isAuthenticated, getDriversValidators, validate, tryCatch(getDrivers))

module.exports = router
