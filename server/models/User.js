const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: String,
  name: String,
  password: {
    type: String,
    required: true,
  },
  roles: [String],
  activeRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
  },
  routes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
    },
  ],
  websocket: {
    id: String,
    isConnected: Boolean,
  },
  isAvailable: Boolean,
  pricing: {
    perKm: Number,
    initialCost: Number,
    currency: String,
  },
  vehicle: {
    brand: String,
    model: String,
    year: Number,
  },
  licensePlate: String,
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
  createdAt: { type: Date, default: Date.now }, // Track creation time
})

schema.methods.transform = function () {
  const { _id, email, phoneNumber, roles, activeRoute } = this

  return {
    _id,
    email,
    roles,
    phoneNumber,
    activeRoute,
  }
}

//unconfirmedUserSchema will be the same as user schema only with TTL index added
const unconfirmedUserSchema = schema.clone()

// Create TTL index to remove documents after 30 minutes
unconfirmedUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 })

mongoose.model('UnconfirmedUser', unconfirmedUserSchema)
mongoose.model('User', schema)
