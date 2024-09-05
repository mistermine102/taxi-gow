import { useEffect, useState } from 'react'
import { ScreenWrapper, BaseTitle } from '../../components/base/base'
import { View } from 'react-native'
import appApi from '../../api/appApi'
import RouteItem from '../../components/RouteItem'

const DriverTrackScreen = () => {
  const [route, setRoute] = useState()

  useEffect(() => {
    const getRoute = async () => {
      try {
        const response = await appApi.get('/users/route')
        setRoute(response.data.route)
      } catch (error) {
        console.log(error)
      }
    }
    getRoute()
  }, [])

  if (!route) return null

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Trasy</BaseTitle>
      </View>
      <RouteItem
        userType="client"
        name={route.driverId}
        status={route.statusId}
        origin={route.clientOrigin.address}
        destination={route.destination.address}
      />
    </ScreenWrapper>
  )
}

export default DriverTrackScreen
