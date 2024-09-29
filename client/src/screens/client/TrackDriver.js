import { useEffect, useState } from 'react'
import { ScreenWrapper, BaseTitle, BaseButton } from '../../components/base/base'
import { View, Image, ActivityIndicator } from 'react-native'
import appApi from '../../api/appApi'
import RouteItem from '../../components/RouteItem'
import { useIsFocused } from '@react-navigation/native'
import MapModal from '../../components/modals/MapModal'
import { Marker } from 'react-native-maps'
import { BaseIcon } from '../../components/base/base'
import { noRoute } from '../../images/index'

const DriverTrackScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [route, setRoute] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [driverLocation, setDriverLocation] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const navigateToRouteCreate = () => {
    navigation.navigate('SelectOrigin')
  }

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
        setIsLoading(true)
        const response = await appApi.get('/users/route')

        setRoute(response.data.route)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getRoute()
  }, [isFocused])

  if (isLoading)
    return (
      <ScreenWrapper>
        <View className="w-full h-[200px] justify-center items-center">
          <ActivityIndicator />
        </View>
      </ScreenWrapper>
    )

  if (!route)
    return (
      <ScreenWrapper>
        <View className="items-center mt-8">
          <BaseTitle>Wygląda na to że nie zamówiłeś żadnego kierowcy</BaseTitle>
          <Image source={noRoute} className="w-[400px] h-[200px]" />
          <View className="w-full">
            <BaseButton title="Zamów kierowcę" onPress={navigateToRouteCreate} />
          </View>
        </View>
      </ScreenWrapper>
    )

  return (
    <ScreenWrapper>
      <MapModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onBtnPress={() => setIsModalVisible(false)}
        markers={
          driverLocation
            ? [
                <Marker key="driverLocation" identifier="driverLocation" coordinate={driverLocation}>
                  <BaseIcon name="taxi" size={48} />
                </Marker>,
              ]
            : []
        }
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
        status={route.status}
        origin={route.clientOrigin.address}
        destination={route.destination.address}
      >
        <BaseButton title="Śledź kierowcę" onPress={openModal} />
      </RouteItem>
    </ScreenWrapper>
  )
}

export default DriverTrackScreen
