const express = require('express')
const router = express.Router()
const { isAuthenticated, hasRole } = require('../middleware/auth')
const { createRoute, changeRouteStatus, getAllRoutes, getRoutePreview } = require('../controllers/route')
const tryCatch = require('../utils/tryCatch')
const { body, query } = require('express-validator')
const validate = require('../middleware/validate')
const validateCoords = require('../utils/validateCoords')
const validatePointDistance = require('../utils/validatePointDistance')
const validateId = require('../utils/validateId')
const validatePhoneNumber = require('../utils/validatePhoneNumber')

const createRouteValidators = [
  body('clientOrigin').notEmpty().custom(validateCoords).custom(validatePointDistance),
  body('destination').notEmpty().custom(validateCoords).custom(validatePointDistance),
  body('driverId').notEmpty().custom(validateId),
]

const manualRouteCreateValidators = [
  body('clientOrigin').notEmpty().custom(validateCoords).custom(validatePointDistance),
  body('destination').notEmpty().custom(validateCoords).custom(validatePointDistance),
  body('driverId').notEmpty().custom(validateId),
  body('clientPhoneNumber').notEmpty().custom(validatePhoneNumber),
]

const changeRoutesStatusValidators = [
  body('newStatusId')
    .notEmpty()
    .isInt()
    .custom(value => {
      if (value !== 100 && (value < 1 || value > 5)) throw new Error('Invalid route id')
      return true
    }),
]

const getRoutePreviewValidators = [
  query('origin').notEmpty().custom(validateCoords),
  query('destination').notEmpty().custom(validateCoords),
  query('driverId').notEmpty().custom(validateId),
]

router.post('/', isAuthenticated, hasRole('client'), createRouteValidators, validate, tryCatch(createRoute))

router.post(
  '/manual',
  isAuthenticated,
  hasRole('admin'),
  manualRouteCreateValidators,
  (req, res, next) => {
    req.createdManually = true
    next()
  },
  validate,
  tryCatch(createRoute)
)

router.patch('/:routeId', isAuthenticated, hasRole('driver'), changeRoutesStatusValidators, validate, tryCatch(changeRouteStatus))

router.get('/', isAuthenticated, hasRole('admin'), tryCatch(getAllRoutes))

router.get('/preview', isAuthenticated, hasRole('admin'), getRoutePreviewValidators, validate, tryCatch(getRoutePreview))

module.exports = router
