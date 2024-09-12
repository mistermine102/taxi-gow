const express = require('express')
const router = express.Router()
const { getRoute, getRouteDriverLocation } = require('../controllers/user')
const tryCatch = require('../utils/tryCatch')
const { isAuthenticated } = require('../middleware/auth')

router.get('/route', isAuthenticated, tryCatch(getRoute))

router.get('/route/driver/location', isAuthenticated, tryCatch(getRouteDriverLocation))

module.exports = router
