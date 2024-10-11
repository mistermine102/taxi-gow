const mongoose = require('mongoose')

require('dotenv').config()
require('./models/Status')

const Status = mongoose.model('Status')

const statuses = [
  {
    _id: 1,
    title: 'Stworzona',
    message: '',
    action: 'Rozpocznij',
    colors: {
      text: '#ca8a04',
      background: '#fef08a',
    },
  },
  {
    _id: 2,
    title: 'Przyjęta',
    message: '',
    action: 'Dotarłem po klienta',
    colors: {
      text: '#0284c7',
      background: '#bfdbfe',
    },
  },
  {
    _id: 3,
    title: 'Odebrano',
    action: 'Dotarłem do punktu docelowego',
    message: '',
    colors: {
      text: '#4f46e5',
      background: '#c7d2fe',
    },
  },
  {
    _id: 4,
    title: 'Dostarczono',
    message: '',
    action: 'Zakończ trasę',
    colors: {
      text: '#9333ea',
      background: '#e9d5ff',
    },
  },
  {
    _id: 5,
    title: 'Zakończona',
    message: '',
    colors: {
      text: '#16a34a',
      background: '#bbf7d0',
    },
  },
]
;(async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Connected to database')
  } catch (err) {
    console.log("Can't connect to database")
  }

  await Status.deleteMany()

  for (const status of statuses) {
    const { _id, title, message, colors, action } = status

    const newStatus = new Status({
      _id,
      title,
      action,
      message,
      colors,
    })
    await newStatus.save()
  }
})()
