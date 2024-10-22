module.exports = (driverPricing, distance) => {
  //total distance is provided in km

  const { initialCost, perKm } = driverPricing

  if (!initialCost || !perKm) throw new Error('Invalid pricing ')
  if (!distance || typeof distance !== 'number') throw new Error('Invalid distance')

  return parseFloat((initialCost + distance * perKm).toFixed(2))
}
