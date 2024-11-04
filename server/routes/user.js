const express = require('express')
const router = express.Router()
const { getRoute, getRouteDriverLocation, toggleAvailability, getAvailability, updateCurrentLocation, getRoutes } = require('../controllers/user')
const tryCatch = require('../utils/tryCatch')
const { isAuthenticated, hasRole } = require('../middleware/auth')

router.get('/route', isAuthenticated, tryCatch(getRoute))

router.get('/route/driver/location', isAuthenticated, tryCatch(getRouteDriverLocation))

router.get('/availability', isAuthenticated, hasRole('driver'), tryCatch(getAvailability))

router.patch('/availability', isAuthenticated, hasRole('driver'), tryCatch(toggleAvailability))

router.patch('/location', isAuthenticated, hasRole('driver'), tryCatch(updateCurrentLocation))

router.get('/routes', isAuthenticated, tryCatch(getRoutes))

module.exports = router
