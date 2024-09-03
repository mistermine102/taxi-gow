const validateCoords = require('./validateCoords')

module.exports = coords => {
  validateCoords(coords)
  const [latitudeStr, longitudeStr] = coords.split(',')

  const latitude = parseFloat(latitudeStr)
  const longitude = parseFloat(longitudeStr)

  return [latitude, longitude]
}
