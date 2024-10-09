const mongoose = require('mongoose')
const socketio = require('socket.io')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const AppError = require('../classes/AppError')

let io

exports.connect = server => {
  io = socketio(server)

  io.on('connection', socket => {
    console.log('Socket connected', socket.id)

    socket.on('disconnect', async () => {
      console.log('Socket disconnected', socket.id)

      if (socket.userId) {
        await User.findByIdAndUpdate(socket.userId, { websocket: { isConnected: false, id: null } })
      }
    })

    socket.on('authenticate', async token => {
      try {
        if (!token) throw new AppError('Invalid token')
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        //check if there is user in database with that socket id
        //
        //logging out doesn't disconnect websocket
        //thus it is possible to have the same connection
        //on two different accounts
        const user = await User.findOne({ 'websocket.id': socket.id })

        if (user) {
          user.websocket.isConnected = false
          user.websocket.id = null
          user.save()
        }

        await User.findByIdAndUpdate(payload.userId, { websocket: { isConnected: true, id: socket.id } })
        socket.userId = payload.userId
      } catch (err) {
        console.log(err)
      }
    })
  })
}

exports.get = () => {
  return io
}
