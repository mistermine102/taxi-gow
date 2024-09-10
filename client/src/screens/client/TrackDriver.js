import { useEffect, useState } from 'react'
import { ScreenWrapper, BaseTitle, BaseButton } from '../../components/base/base'
import { View } from 'react-native'
import appApi from '../../api/appApi'
import RouteItem from '../../components/RouteItem'
import { useIsFocused } from '@react-navigation/native'
import MapModal from '../../components/modals/MapModal'

const DriverTrackScreen = () => {
  const isFocused = useIsFocused()
  const [route, setRoute] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (!isFocused) return

    const getRoute = async () => {
      try {
        const response = await appApi.get('/users/route')
        setRoute(response.data.route)
      } catch (error) {
        console.log(error)
      }
    }
    getRoute()
  }, [isFocused])

  if (!route) return null

  return (
    <ScreenWrapper>
      <MapModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onBtnPress={() => setIsModalVisible(false)}
        btnCaption="Wróć"
        title="Śledź kierowcę"
      />
      <View className="mt-16 mb-4">
        <BaseTitle>Trasy</BaseTitle>
      </View>
      <RouteItem
        userType="client"
        name={route.driverId}
        status={route.statusId}
        origin={route.clientOrigin.address}
        destination={route.destination.address}
      >
        <BaseButton title="Śledź kierowcę" onPress={() => setIsModalVisible(true)} />
      </RouteItem>
    </ScreenWrapper>
  )
}

export default DriverTrackScreen
