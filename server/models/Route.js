const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  address: String,
})

const statusSchema = require('./Status')

const schema = new mongoose.Schema({
  client: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    phoneNumber: String,
  },
  driver: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    licensePlate: String,
    phoneNumber: String,
    name: String,
  },
  clientOrigin: locationSchema,
  driverOrigin: locationSchema,
  destination: locationSchema,
  waypoints: [locationSchema],
  totalDistance: Number,
  totalCost: Number,
  status: statusSchema,
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
  meta: {
    createdAt: Date,
    startedAt: Date,
    clientPickedUpAt: Date,
    clientDroppedOffAt: Date,
    finishedAt: Date,
  },
  creationMethod: String,
})

mongoose.model('Route', schema)
mongoose.model('ArchivedRoute', schema)
