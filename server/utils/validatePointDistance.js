const haversine = require('./HaversineFormula')

const SERVICED_AREA_CENTER = {
  latitude: 51.425698,
  longitude: 17.933337,
}

//in meters
const SERVICED_AREA_RADIUS = 30000
const ERROR_MARGIN = 0.01 //1%

module.exports = value => {
  const [latitudeStr, longitudeStr] = value.split(',')
  const latitude = parseFloat(latitudeStr)
  const longitude = parseFloat(longitudeStr)

  const distance = haversine(SERVICED_AREA_CENTER.latitude, SERVICED_AREA_CENTER.longitude, latitude, longitude)
  const distanceInMeters = distance * 1000

  //adding 1% of error (in this case 300m)
  //server will accept values that are 300m above the specified radius
  if (distanceInMeters > (1 + ERROR_MARGIN) * SERVICED_AREA_RADIUS) throw new Error('Point outside a serviced area')

  return true
}
