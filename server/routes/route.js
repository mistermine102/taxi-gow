const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/auth')
const { createRoute } = require('../controllers/route')
const tryCatch = require('../utils/tryCatch')
const { body } = require('express-validator')
const validate = require('../middleware/validate')
const validateCoords = require('../utils/validateCoords')
const mongoose = require('mongoose')

const createRouteValidators = [
  body('clientOrigin').notEmpty().custom(validateCoords),
  body('destination').notEmpty().custom(validateCoords),
  body('driverId')
    .notEmpty()
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) throw new Error('Invalid id')
      return true
    }),
]

router.post('/', isAuthenticated, createRouteValidators, validate, tryCatch(createRoute))

module.exports = router
