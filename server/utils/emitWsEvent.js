const socket = require('../socket/index')

module.exports = ({ name, payload }, users) => {
  const io = socket.get()

  for (const user of users) {
    if (user.websocket && user.websocket.isConnected) {
      io.to(user.websocket.id).emit(name, payload)
    }
  }
}
