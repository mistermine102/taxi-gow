module.exports = value => {
  if (typeof value !== 'string') throw new Error('Coordinates must be a string')

  const [latitudeStr, longitudeStr] = value.split(',')
  if (!latitudeStr || !longitudeStr) throw new Error('Invalid coordinates format')

  const latitude = parseFloat(latitudeStr)
  const longitude = parseFloat(longitudeStr)
  if (typeof latitude !== 'number' || typeof longitude !== 'number') throw new Error('Invalid coordinates value')
  if (latitude < -90 || latitude > 90) throw new Error('Invalid latitude value')
  if (longitude < -180 || longitude > 180) throw new Error('Invalid longitude value')

  return true
}
