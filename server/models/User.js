const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  hasActiveRoute: Boolean,
  isAvailable: Boolean,
  pricing: {
    perKm: Number,
    initialCost: Number,
    currency: String,
  },
  currentLocation: {
    timestamp: Number,
    coords: {
      latitude: Number,
      longitude: Number,
      altitude: Number,
      accuracy: Number,
      heading: Number,
      speed: Number,
    },
  },
})

schema.methods.transform = function () {
  const { _id, email, phoneNumber, role } = this

  return {
    _id,
    email,
    role,
    phoneNumber,
  }
}

mongoose.model('User', schema)
