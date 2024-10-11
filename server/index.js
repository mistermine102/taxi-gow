require('dotenv').config()

//models
require('./models/User')
require('./models/Route')
require('./models/Status')

//packages
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socket = require('./socket/index')

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
const driversRoutes = require('./routes/driver')
const usersRoutes = require('./routes/user')

app.use(authRoutes)
app.use('/routes', routesRoutes)
app.use('/drivers', driversRoutes)
app.use('/users', usersRoutes)

//invalid route
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Invalid route' })
})

//error handler
app.use(errorHandler)

const server = http.createServer(app)

socket.connect(server)

server.listen(3000, () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log("Can't connect to database"))
  console.log('Server listening on port 3000')
})
