import { BaseButton, BaseIcon, BaseLink, BaseTitle, ScreenWrapper } from '../../components/base/base'
import appApi from '../../api/appApi'
import { useEffect, useState } from 'react'
import RouteItem from '../../components/RouteItem'
import { useIsFocused } from '@react-navigation/native'
import { View, Text, Platform, Linking } from 'react-native'
import MapModal from '../../components/modals/MapModal'
import LocationExample from '../../components/_LocationExample'
import { Marker } from 'react-native-maps'

const DriverRoutes = () => {
  const [route, setRoute] = useState()
  const [btnCaption, setBtnCaption] = useState()
  const [btnFunction, setBtnFunction] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const isFocused = useIsFocused()

  const openRouteNavigation = () => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${51.4177742},${17.927074}`
    const label = 'Custom Label'
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })
    Linking.openURL(url)
  }

  const updateButton = (statusId, routeId) => {
    const uri = `/routes/${routeId}`
    let newBtnCaption = ''
    let newStatusId = null

    //check route status
    switch (statusId) {
      case 1:
        newBtnCaption = 'Rozpocznij'
        newStatusId = 2
        break
      case 2:
        newBtnCaption = 'Dotarłem po klienta'
        newStatusId = 3
        break
      case 3:
        newBtnCaption = 'Dotarłem do punktu docelowego'
        newStatusId = 4
        break
      case 4:
        newBtnCaption = 'Zakończ trasę'
        newStatusId = 5
        break
      default:
        break
    }
    setBtnCaption(newBtnCaption)
    setBtnFunction(() => async () => {
      const response = await appApi.patch(uri, {
        newStatusId,
      })

      const { route: newRoute } = response.data
      newRoute.statusId === 5 ? setRoute(null) : setRoute(newRoute)
    })
  }

  useEffect(() => {
    if (!isFocused) return

    const getRoutes = async () => {
      try {
        const response = await appApi.get('/users/route')
        if (!response.data.route) return

        const { statusId, _id } = response.data.route

        updateButton(statusId, _id)
        setRoute(response.data.route)
      } catch (err) {
        console.log(err)
      }
    }
    getRoutes()
  }, [isFocused])

  useEffect(() => {
    if (!route) return

    const { statusId, _id } = route
    updateButton(statusId, _id)
  }, [route])

  return (
    <ScreenWrapper>
      <LocationExample />
      {route ? (
        <>
          <MapModal
            isVisible={isModalVisible}
            onBtnPress={() => setIsModalVisible(false)}
            btnCaption="Wróć"
            title="Zobacz trasę"
            onClose={() => setIsModalVisible(false)}
            markers={[
              <Marker key="currentLocation" identifier="currentLocation" coordinate={{ latitude: 51.4177742, longitude: 17.9270741 }}>
                <BaseIcon name="map-marker-account" size={48} />
              </Marker>,
            ]}
            directions={{
              origin: { latitude: route.clientOrigin.latitude, longitude: route.clientOrigin.longitude },
              destination: { latitude: route.destination.latitude, longitude: route.destination.longitude },
            }}
            region={{ latitude: 51.4177742, longitude: 17.9270741, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
          />
          <View className="mt-16 mb-4">
            <BaseTitle>Trasy</BaseTitle>
          </View>
          <RouteItem
            userType="driver"
            name={route.clientId}
            status={route.statusId}
            origin={route.clientOrigin.address}
            destination={route.destination.address}
          >
            <View className="items-end -mt-4 mb-4">
              <BaseLink onPress={openRouteNavigation} title="Nawigacja" />
            </View>
            <BaseButton title={btnCaption} onPress={btnFunction} />
            <BaseButton alt title="Zobacz na mapie" onPress={() => setIsModalVisible(true)} />
          </RouteItem>
        </>
      ) : null}
    </ScreenWrapper>
  )
}
export default DriverRoutes
