require('dotenv').config()
require('./models/User')

const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log("Can't connect to database"))

const addDummyClients = async () => {
  const clientsEmails = ['client1@gmail.com', 'client2@gmail.com', 'client3@gmail.com', 'client4gmail.com', 'client5@gmail.com']
  const clientsNames = ['Nikodem', 'Józef', 'Szymon', 'Maciej', 'Adam']

  await User.deleteMany({ roles: 'client', email: { $in: clientsEmails } })
  console.log('Removed clients')

  for (let i = 0; i < 5; i++) {
    const password = await bcrypt.hash('123', 12)

    const client = new User({
      email: clientsEmails[i],
      name: clientsNames[i],
      password,
      phoneNumber: '+48532395944',
      activeRoute: null,
      roles: ['client'],
    })
    client.save()
  }
  console.log('Added clients')
}

addDummyClients()
