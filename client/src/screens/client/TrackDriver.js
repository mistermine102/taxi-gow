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
  const [driverLocation, setDriverLocation] = useState()

  const openModal = async () => {
    try {
      setIsModalVisible(true)
      
      const response = await appApi.get('/users/route/driver/location')
      setDriverLocation(response.data.coords)
    } catch (err) {
      console.log(err)
    }
  }

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
        markers={driverLocation ? [{ coords: driverLocation, id: 'driverLocation' }] : []}
        region={
          driverLocation
            ? { latitude: driverLocation.latitude, longitude: driverLocation.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }
            : null
        }
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
        <BaseButton title="Śledź kierowcę" onPress={openModal} />
      </RouteItem>
    </ScreenWrapper>
  )
}

export default DriverTrackScreen
