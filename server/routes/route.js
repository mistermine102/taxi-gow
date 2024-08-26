const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/auth')
const { createRoute } = require('../controllers/route')
const tryCatch = require('../utils/tryCatch')

router.post('/', isAuthenticated, tryCatch(createRoute))

module.exports = router
