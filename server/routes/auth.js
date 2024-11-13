const express = require('express')
const { body } = require('express-validator')
const tryCatch = require('../utils/tryCatch')
const router = express.Router()
const {
  signup,
  signin,
  getUser,
  verifyUser,
  sendVerifyEmail,
} = require('../controllers/auth')
const validate = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/auth')
const validatePhoneNumber = require('../utils/validatePhoneNumber')

//validators
const signupValidators = [
  body('email').trim().notEmpty().isEmail().escape(),
  body('password').trim().notEmpty().isLength({ min: 6 }).escape(),
  body('phoneNumber').trim().notEmpty().custom(validatePhoneNumber).escape(),
]

//routes
router.post('/signup', signupValidators, validate, tryCatch(signup))

router.post('/signin', tryCatch(signin))

router.get('/user', isAuthenticated, tryCatch(getUser))

router.get('/user/verify/:token', verifyUser)

router.post('/user/verify/send', tryCatch(sendVerifyEmail))

module.exports = router
