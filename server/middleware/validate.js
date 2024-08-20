const AppError = require('../classes/AppError')
const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) throw new AppError('Validation failed', 400, result.array())
  next()
}
