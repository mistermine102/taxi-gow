import { BaseButton, BaseIcon, BaseTitle, ScreenWrapper } from '../../components/base/base'
import appApi from '../../api/appApi'
import { useState, useContext } from 'react'
import RouteItem from '../../components/RouteItem'
import { TouchableOpacity, View, Text } from 'react-native'
import MapModal from '../../components/modals/MapModal'
import BackgroundTracking from '../../components/driver/BackgroundTracking'
import { Marker } from 'react-native-maps'
import RouteNavigation from '../../components/driver/RouteNavigation'
import AuthContext from '../../context/Auth'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import Loader from '../../components/Loader'
import useLocation from '../../hooks/useLocation'
import EmptyState from '../../components/EmptyState'
import { SheetManager } from 'react-native-actions-sheet'
import colors from '../../../colors'

const DriverRoutes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user, updateActiveRoute } = useContext(AuthContext)
  const { activeRoute: route } = user
  const changeRouteStatus = useAsyncRequest()
  const refreshRoutes = useAsyncRequest()
  const { currentLocation } = useLocation()

  //this only works if statuses id's match their hierarchy
  //if we have a status that's id doesn't match it's hierarchy we have to handle it seperatly
  //for example we might have hierarchy: 1 -> 2 -> 6 -> 3 -> 4 -> 5
  //in this case this would not work

  const handleButtonPress = async () => {
    const nextStatus = route.status._id + 1

    changeRouteStatus.send(async () => {
      await appApi.patch('/routes/' + route._id, {
        newStatusId: nextStatus,
      })
    })
  }

  const handleRefreshPress = async () => {
    refreshRoutes.send(async () => {
      const response = await appApi.get('/users/route')
      updateActiveRoute(response.data.route)
    })
  }

  return (
    <ScreenWrapper>
      <BackgroundTracking />
      <View className="mt-4 mb-4 flex-row items-center justify-between">
        <BaseTitle>Trasy</BaseTitle>
        <TouchableOpacity onPress={handleRefreshPress}>
          <BaseIcon name="refresh" />
        </TouchableOpacity>
      </View>
      {refreshRoutes.isLoading ? (
        <View className="h-[300px] items-center justify-center">
          <Loader size="large" />
        </View>
      ) : (
        <View>
          {route ? (
            <>
              <MapModal
                isVisible={isModalVisible}
                onBtnPress={() => setIsModalVisible(false)}
                btnCaption="Wróć"
                title="Zobacz trasę"
                onClose={() => setIsModalVisible(false)}
                markers={
                  currentLocation
                    ? [
                        <Marker
                          key="currentLocation"
                          identifier="currentLocation"
                          coordinate={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
                        >
                          <BaseIcon name="map-marker" size={48} color={colors.currentLocationMarker} />
                        </Marker>,
                      ]
                    : []
                }
                directions={{
                  origin: {
                    latitude: route.clientOrigin.latitude,
                    longitude: route.clientOrigin.longitude,
                  },
                  destination: {
                    latitude: route.destination.latitude,
                    longitude: route.destination.longitude,
                  },
                }}
                region={{
                  latitude: route.clientOrigin.latitude,
                  longitude: route.clientOrigin.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              />
              <RouteItem
                userType="driver"
                name={route.client.phoneNumber}
                callable={true}
                status={route.status}
                origin={route.clientOrigin.address}
                destination={route.destination.address}
                onOptionsPress={() =>
                  SheetManager.show('driverRouteOptions', { payload: { routeId: route._id, verificationCode: route.verificationCode } })
                }
              >
                <View className="items-end -mt-4 mb-4">
                  <RouteNavigation clientOrigin={route.clientOrigin} destination={route.destination} />
                </View>
                <View style={{ gap: 8 }}>
                  <BaseButton title={route.status.action} onPress={handleButtonPress} isLoading={changeRouteStatus.isLoading} />
                  <BaseButton alt title="Zobacz na mapie" onPress={() => setIsModalVisible(true)} />
                </View>
              </RouteItem>
            </>
          ) : (
            <View className="h-[300px] items-center justify-center">
              <EmptyState />
            </View>
          )}
        </View>
      )}
    </ScreenWrapper>
  )
}

export default DriverRoutes
