const express = require('express')
const { getDriverLocation, getAllDrivers, getOptimalDriver } = require('../controllers/driver')
const { isAuthenticated, hasRole } = require('../middleware/auth')
const { query } = require('express-validator')
const validate = require('../middleware/validate')
const tryCatch = require('../utils/tryCatch')
const validateCoords = require('../utils/validateCoords')
const mongoose = require('mongoose')

const router = express.Router()

const getDriversValidators = [query('origin').notEmpty().custom(validateCoords), query('destination').notEmpty().custom(validateCoords)]

const getDriverLocationValidators = [
  query('driverId')
    .notEmpty()
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) throw new Error('Invalid id')
      return true
    }),
]

router.get('/optimal', isAuthenticated, getDriversValidators, validate, tryCatch(getOptimalDriver))

router.get('/all', isAuthenticated, hasRole('admin'), tryCatch(getAllDrivers))

router.get('/location', isAuthenticated, hasRole('admin'), getDriverLocationValidators, validate, tryCatch(getDriverLocation))

module.exports = router
