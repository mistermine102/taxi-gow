module.exports = class AppError extends Error {
  constructor(message = 'Something went wrong', statusCode = 500, errors = []) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
  }
}
