const express = require('express')
const router = express.Router()
const { getRoute, getRouteDriverLocation, toggleAvailability, getAvailability, updateCurrentLocation } = require('../controllers/user')
const tryCatch = require('../utils/tryCatch')
const { isAuthenticated, isDriver } = require('../middleware/auth')

router.get('/route', isAuthenticated, tryCatch(getRoute))

router.get('/route/driver/location', isAuthenticated, tryCatch(getRouteDriverLocation))

router.get('/availability', isAuthenticated, isDriver, tryCatch(getAvailability))

router.patch('/availability', isAuthenticated, isDriver, tryCatch(toggleAvailability))

router.patch('/location', isAuthenticated, isDriver, tryCatch(updateCurrentLocation))

module.exports = router
