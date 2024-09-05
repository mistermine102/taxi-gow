const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/auth')
const { createRoute, changeRouteStatus } = require('../controllers/route')
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
const changeRoutesStatusValidators = [body('newStatusId').notEmpty().isInt({ min: 1, max: 5 })]

router.post('/', isAuthenticated, createRouteValidators, validate, tryCatch(createRoute))

router.patch('/:routeId', isAuthenticated, changeRoutesStatusValidators, validate, tryCatch(changeRouteStatus))

module.exports = router
