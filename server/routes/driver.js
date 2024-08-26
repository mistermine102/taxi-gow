const express = require('express')
const { getDrivers } = require('../controllers/driver')
const { isAuthenticated } = require('../middleware/auth')
const { query } = require('express-validator')
const validate = require('../middleware/validate')
const tryCatch = require('../utils/tryCatch')

const router = express.Router()

const getDriversValidators = [
  query('latitude').notEmpty().isFloat({ min: -90, max: 90 }),
  query('longitude').notEmpty().isFloat({ min: -180, max: 180 }),
]

router.get('/', isAuthenticated, getDriversValidators, validate, tryCatch(getDrivers))

module.exports = router
