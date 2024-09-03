const express = require('express')
const { getDrivers } = require('../controllers/driver')
const { isAuthenticated } = require('../middleware/auth')
const { query } = require('express-validator')
const validate = require('../middleware/validate')
const tryCatch = require('../utils/tryCatch')
const validateCoords = require('../utils/validateCoords')

const router = express.Router()

const getDriversValidators = [query('origin').notEmpty().custom(validateCoords), query('destination').notEmpty().custom(validateCoords)]

router.get('/', isAuthenticated, getDriversValidators, validate, tryCatch(getDrivers))

module.exports = router
