import { BaseButton, BaseIcon, BaseLink, BaseTitle, ScreenWrapper } from '../../components/base/base'
import appApi from '../../api/appApi'
import { useEffect, useState } from 'react'
import RouteItem from '../../components/RouteItem'
import { useIsFocused } from '@react-navigation/native'
import { View } from 'react-native'
import MapModal from '../../components/modals/MapModal'
import BackgroundTracking from '../../components/driver/BackgroundTracking'
import { Marker } from 'react-native-maps'
import RouteNavigation from '../../components/driver/RouteNavigation'
import Loader from '../../components/Loader'

const DriverRoutes = () => {
  const [route, setRoute] = useState()
  const [btnCaption, setBtnCaption] = useState()
  const [btnFunction, setBtnFunction] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = useState(false)

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
      newRoute.status._id === 5 ? setRoute(null) : setRoute(newRoute)
    })
  }

  useEffect(() => {
    if (!isFocused) return

    const getRoutes = async () => {
      try {
        setIsLoading(true)
        const response = await appApi.get('/users/route')
        if (!response.data.route) return
        const { statusId, _id } = response.data.route

        updateButton(statusId, _id)
        setRoute(response.data.route)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getRoutes()
  }, [isFocused])

  useEffect(() => {
    if (!route) return

    const { status, _id } = route
    updateButton(status._id, _id)
  }, [route])

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
          <View className="mt-2 mb-4">
            <BaseTitle>Trasy</BaseTitle>
          </View>
          {isLoading ? (
            <View className="w-full h-[200px] items-center justify-center">
              <Loader />
            </View>
          ) : (
            <RouteItem
              userType="driver"
              name={route.clientId}
              status={route.status}
              origin={route.clientOrigin.address}
              destination={route.destination.address}
            >
              <View className="items-end -mt-4 mb-4">
                <RouteNavigation clientOrigin={route.clientOrigin} destination={route.destination} />
              </View>
              <BaseButton title={btnCaption} onPress={btnFunction} />
              <BaseButton alt title="Zobacz na mapie" onPress={() => setIsModalVisible(true)} />
            </RouteItem>
          )}
        </>
      ) : null}
    </ScreenWrapper>
  )
}

export default DriverRoutes
