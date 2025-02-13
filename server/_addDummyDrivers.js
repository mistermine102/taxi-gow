require('dotenv').config()
require('./models/User')

const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log("Can't connect to database"))

const addDummyDrivers = async (req, res) => {
  const dummyLocations = [
    {
      latitude: 51.4177742,
      longitude: 17.9270741,
    },
    {
      latitude: 51.4178746,
      longitude: 17.9361203,
    },
    {
      latitude: 51.4293177,
      longitude: 17.9400632,
    },
    {
      latitude: 51.4339642,
      longitude: 17.9222745,
    },
    {
      latitude: 51.4372935,
      longitude: 17.9400534,
    },
  ]

  const dummyNames = ['Jan', 'Wiktor', 'Marek', 'Kamil', 'Sebastian']
  const dummyPlates = ['POT HUF2', 'POS 34789', 'PKE DH67', 'POT 9C7A', 'PKE NZA9']

  await User.deleteMany({ roles: 'driver' })
  console.log('Removed drivers')

  for (let i = 0; i < 5; i++) {
    const password = await bcrypt.hash('123', 12)

    const { latitude, longitude } = dummyLocations[i]

    const driver = new User({
      email: `driver${i + 1}@gmail.com`,
      phoneNumber: '+48532395944',
      name: dummyNames[i],
      password,
      roles: ['driver'],
      isAvailable: true,
      activeRoute: null,
      routes: [],
      pricing: {
        perKm: 5,
        initialCost: 15,
        currency: 'PLN',
      },
      licensePlate: dummyPlates[i],
      vehicle: {
        brand: 'Seat',
        model: 'Ibiza',
        year: 2010,
      },
      currentLocation: {
        timestamp: 10000,
        coords: {
          latitude,
          longitude,
          accuracy: 1,
          altitude: 1,
          heading: 1,
          speed: 1,
        },
      },
    })
    driver.save()
  }
  console.log('Added drivers')
}

addDummyDrivers()
