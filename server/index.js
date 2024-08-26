require('dotenv').config()

//models
require('./models/User')
require('./models/Route')

//packages
const express = require('express')
const mongoose = require('mongoose')

//other imports
const errorHandler = require('./middleware/errorHandler')
const { verifyToken } = require('./middleware/auth')

//app init
const app = express()

//middleware
app.use(express.json())
app.use(verifyToken)

//routes
const authRoutes = require('./routes/auth')
const routesRoutes = require('./routes/route')
app.use(authRoutes)
app.use('/routes', routesRoutes)

//invalid route
app.all('*', (req, res) => {
  res.json({ message: 'Invalid route' })
})

//error handler
app.use(errorHandler)

//app
app.listen(3000, () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log("Can't connect to database"))
  console.log('Server listening on port 3000')
})
