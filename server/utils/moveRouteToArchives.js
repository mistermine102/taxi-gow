const mongoose = require('mongoose')
const ArchivedRoute = mongoose.model('ArchivedRoute')

const moveRouteToArchives = async (route, client, driver) => {
  //push the route to the archives
  const archivedRoute = new ArchivedRoute({
    ...route._doc,
  })

  await archivedRoute.save()

  //update driver
  driver.isAvailable = true
  driver.activeRoute = null
  await driver.save()

  //update client (only if route was NOT created manually)
  if (route.creationMethod !== 'manual') {
    client.activeRoute = null
    await client.save()
  }

  await route.deleteOne()
}

module.exports = moveRouteToArchives
