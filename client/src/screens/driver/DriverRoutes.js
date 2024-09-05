import { BaseTitle, ScreenWrapper } from '../../components/base/base'
import appApi from '../../api/appApi'
import { useEffect, useState } from 'react'
import RouteItem from '../../components/RouteItem'
import { View } from 'react-native'

const DriverRoutes = () => {
  const [route, setRoute] = useState()

  useEffect(() => {
    const getRoutes = async () => {
      const response = await appApi.get('/users/route')
      setRoute(response.data.route)
    }
    getRoutes()
  }, [])

  if (!route) return null

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Trasy</BaseTitle>
      </View>
      <RouteItem
        userType="driver"
        name={route.clientId}
        status={route.statusId}
        origin={route.clientOrigin.address}
        destination={route.destination.address}
      />
    </ScreenWrapper>
  )
}
export default DriverRoutes
