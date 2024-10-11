import { useState, useContext } from 'react'
import {
  ScreenWrapper,
  BaseTitle,
  BaseButton,
} from '../../components/base/base'
import { View, Image } from 'react-native'
import appApi from '../../api/appApi'
import RouteItem from '../../components/RouteItem'
import MapModal from '../../components/modals/MapModal'
import { Marker } from 'react-native-maps'
import { BaseIcon } from '../../components/base/base'
import { noRoute } from '../../images/index'
import AuthContext from '../../context/Auth'

const DriverTrackScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [driverLocation, setDriverLocation] = useState()
  const { user } = useContext(AuthContext)
  const { activeRoute: route } = user

  const navigateToRouteCreate = () => {
    navigation.navigate('RouteCreateStack')
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

  if (!route)
    return (
      <ScreenWrapper>
        <View className="items-center mt-8">
          <BaseTitle>Wygląda na to że nie zamówiłeś żadnego kierowcy</BaseTitle>
          <Image source={noRoute} className="w-[400px] h-[200px]" />
          <View className="w-full">
            <BaseButton
              title="Zamów kierowcę"
              onPress={navigateToRouteCreate}
            />
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
                <Marker
                  key="driverLocation"
                  identifier="driverLocation"
                  coordinate={driverLocation}
                >
                  <BaseIcon name="taxi" size={48} />
                </Marker>,
              ]
            : []
        }
        region={
          driverLocation
            ? {
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
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
        <BaseButton shadow={false} title="Śledź kierowcę" onPress={openModal} />
      </RouteItem>
    </ScreenWrapper>
  )
}

export default DriverTrackScreen
