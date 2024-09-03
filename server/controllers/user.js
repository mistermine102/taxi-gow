const mongoose = require('mongoose')
const Route = mongoose.model('Route')

exports.getRoute = async (req, res) => {
  const route = await Route.findOne({ clientId: req.user._id })
  
  res.json({ route })
}
