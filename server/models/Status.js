const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    _id: Number,
    title: String,
    message: String,
    action: String,
    colors: {
      text: String,
      background: String,
    },
  },
  { collection: 'statuses' }
)

mongoose.model('Status', schema)

module.exports = schema
