const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  address: {
    city: String,
    street: String,
    postalCode: String,
  },
})

const schema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  clientOrigin: locationSchema,
  driverOrigin: locationSchema,
  destination: locationSchema,
  waypoints: [locationSchema],
  totalLength: Number,
  totalPrice: Number,
  statusId: {
    type: Number,
    required: true,
  },
  history: [
    {
      message: String,
      action: String,
      timestamp: Date,
    },
  ],
  duration: {
    estimated: Number,
    actual: Number,
  },
})

mongoose.model('Route', schema)
