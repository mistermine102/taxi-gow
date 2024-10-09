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
  activeRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
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
  websocket: {
    id: String,
    isConnected: Boolean,
  },
})

schema.methods.transform = function () {
  const { _id, email, phoneNumber, role, activeRoute } = this

  return {
    _id,
    email,
    role,
    phoneNumber,
    activeRoute,
  }
}

mongoose.model('User', schema)
