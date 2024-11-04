import { useState, useContext } from 'react'
import { ScreenWrapper, BaseTitle, BaseButton } from '../../components/base/base'
import { View, Image, TouchableOpacity } from 'react-native'
import appApi from '../../api/appApi'
import RouteItem from '../../components/RouteItem'
import MapModal from '../../components/modals/MapModal'
import { Marker } from 'react-native-maps'
import { BaseIcon } from '../../components/base/base'
import { noRoute } from '../../images/index'
import AuthContext from '../../context/Auth'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import Loader from '../../components/Loader'
import useLocation from '../../hooks/useLocation'
import colors from '../../../colors'
import { SheetManager } from 'react-native-actions-sheet'

let intervalId = null

const DriverTrackScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [driverLocation, setDriverLocation] = useState()
  const refreshRoutes = useAsyncRequest()
  const getDriver = useAsyncRequest()
  const { currentLocation, locationPermissionError, getCurrentLocation } = useLocation()
  const [mapModalMarkers, setMapModalMarkers] = useState([])

  const { user, updateActiveRoute } = useContext(AuthContext)
  const { activeRoute: route } = user

  const navigateToRouteCreate = () => {
    navigation.navigate('RouteCreateStack')
  }

  const getDriverLocation = () => {
    getCurrentLocation()

    getDriver.send(async () => {
      setDriverLocation(null)

      const response = await appApi.get('/users/route/driver/location')
      setDriverLocation(response.data.coords)

      //push driver location marker
      setMapModalMarkers([
        <Marker key="driverLocation" identifier="driverLocation" coordinate={response.data.coords}>
          <BaseIcon name="taxi" size={48} color={colors.primary} />
        </Marker>,
        <Marker key="currentLocation" identifier="currentLocation" coordinate={currentLocation.coords}>
          <BaseIcon name="map-marker" size={48} color={colors.currentLocationMarker} />
        </Marker>,
      ])
    })
  }

  const openModal = async () => {
    setIsModalVisible(true)
    getDriverLocation()
    intervalId = setInterval(getDriverLocation, 30000)
  }

  const closeModal = () => {
    clearInterval(intervalId)
    setIsModalVisible(false)
  }

  const handleRefreshPress = () => {
    refreshRoutes.send(async () => {
      const response = await appApi.get('/users/route')
      updateActiveRoute(response.data.route)
    })
  }

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
        isLoading={getDriver.isLoading}
        onClose={closeModal}
        onBtnPress={closeModal}
        markers={mapModalMarkers}
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
      <View className="mt-16 mb-4 flex-row justify-between">
        <BaseTitle>Twoje przejazdy</BaseTitle>
        <TouchableOpacity onPress={handleRefreshPress}>
          <BaseIcon name="refresh" />
        </TouchableOpacity>
      </View>
      {refreshRoutes.isLoading ? (
        <Loader size="large" />
      ) : (
        <RouteItem
          userType="client"
          name={route.driver.name}
          licensePlate={route.driver.licensePlate}
          status={route.status}
          origin={route.clientOrigin.address}
          destination={route.destination.address}
          onOptionsPress={() =>
            SheetManager.show('clientRouteOptions', { payload: { driver: route.driver, verificationCode: route.verificationCode } })
          }
        >
          <BaseButton shadow={false} title="Śledź kierowcę" onPress={openModal} />
        </RouteItem>
      )}
    </ScreenWrapper>
  )
}

export default DriverTrackScreen
