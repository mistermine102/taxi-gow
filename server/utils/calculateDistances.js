const { Client } = require('@googlemaps/google-maps-services-js')

module.exports = async (origins, destinations) => {
  const client = new Client()

  const response = await client.distancematrix({
    params: {
      origins,
      destinations,
      units: 'metric',
      key: process.env.GOOGLE_API_KEY,
    },
  })

  return response.data
}
