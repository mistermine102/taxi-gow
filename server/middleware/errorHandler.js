module.exports = (err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong', errors = [] } = err

  console.log('ERROR', statusCode, message)

  if (statusCode === 500) {
    message = 'Something went wrong'
  }

  res.status(statusCode).json({
    message,
    status: statusCode,
    errors,
  })
}
