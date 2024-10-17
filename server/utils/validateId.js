const mongoose = require('mongoose')

module.exports = value => {
  if (!mongoose.Types.ObjectId.isValid(value)) throw new Error('Invalid id')
  return true
}
