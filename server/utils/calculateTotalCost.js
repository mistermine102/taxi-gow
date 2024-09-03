module.exports = (driverPricing, totalDistance) => {
  //total distance is provided in km

  const { initialCost, perKm } = driverPricing

  if (!initialCost || !perKm) throw new Error('Invalid pricing ')
  if (!totalDistance || typeof totalDistance !== 'number') throw new Error('Invalid distance')

  return parseFloat((initialCost + totalDistance * perKm).toFixed(2))
}
