const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

schema.methods.transform = function () {
  const { _id, email, role } = this

  return {
    _id,
    email,
    role,
  }
}

mongoose.model('User', schema)
