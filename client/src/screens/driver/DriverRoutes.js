import {
  BaseButton,
  BaseIcon,
  BaseTitle,
  ScreenWrapper,
} from '../../components/base/base'
import appApi from '../../api/appApi'
import { useState, useContext } from 'react'
import RouteItem from '../../components/RouteItem'
import { View } from 'react-native'
import MapModal from '../../components/modals/MapModal'
import BackgroundTracking from '../../components/driver/BackgroundTracking'
import { Marker } from 'react-native-maps'
import RouteNavigation from '../../components/driver/RouteNavigation'
import AuthContext from '../../context/Auth'

const DriverRoutes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user } = useContext(AuthContext)
  const { activeRoute: route } = user

  //this only works if statuses id's match their hierarchy
  //if we have a status that's id doesn't match it's hierarchy we have to handle it seperatly
  //for example we might have hierarchy: 1 -> 2 -> 6 -> 3 -> 4 -> 5
  //in this case this would not work

  const changeRouteStatus = async () => {
    const nextStatus = route.status._id + 1

    appApi.patch('/routes/' + route._id, {
      newStatusId: nextStatus,
    })
  }

  return (
    <ScreenWrapper>
      <BackgroundTracking />
      {route ? (
        <>
          <MapModal
            isVisible={isModalVisible}
            onBtnPress={() => setIsModalVisible(false)}
            btnCaption="Wróć"
            title="Zobacz trasę"
            onClose={() => setIsModalVisible(false)}
            markers={[
              <Marker
                key="currentLocation"
                identifier="currentLocation"
                coordinate={{ latitude: 51.4177742, longitude: 17.9270741 }}
              >
                <BaseIcon name="map-marker-account" size={48} />
              </Marker>,
            ]}
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
              latitude: 51.4177742,
              longitude: 17.9270741,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          />
          <View className="mt-2 mb-4">
            <BaseTitle>Trasy</BaseTitle>
          </View>

          <RouteItem
            userType="driver"
            name={route.clientId}
            status={route.status}
            origin={route.clientOrigin.address}
            destination={route.destination.address}
          >
            <View className="items-end -mt-4 mb-4">
              <RouteNavigation
                clientOrigin={route.clientOrigin}
                destination={route.destination}
              />
            </View>
            <BaseButton
              title={route.status.action}
              onPress={changeRouteStatus}
            />
            <BaseButton
              alt
              title="Zobacz na mapie"
              onPress={() => setIsModalVisible(true)}
            />
          </RouteItem>
        </>
      ) : null}
    </ScreenWrapper>
  )
}

export default DriverRoutes
