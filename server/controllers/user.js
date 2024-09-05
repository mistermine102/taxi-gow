const mongoose = require('mongoose')
const Route = mongoose.model('Route')

exports.getRoute = async (req, res) => {
  const route = await Route.findOne({ [req.user.role === 'client' ? 'clientId' : 'driverId']: req.user._id })

  res.json({ route })
}
