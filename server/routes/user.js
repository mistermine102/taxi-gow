const express = require('express')
const router = express.Router()
const { getRoute } = require('../controllers/user')
const tryCatch = require('../utils/tryCatch')
const { isAuthenticated } = require('../middleware/auth')

router.get('/route', isAuthenticated, tryCatch(getRoute))

module.exports = router
