import { Image, View } from 'react-native'
import PlacesInput from '../../../components/PlacesInput'
import Map from '../../../components/Map'
import { useContext, useEffect } from 'react'
import RouteContext from '../../../context/Route'
import AuthContext from '../../../context/Auth'
import appApi from '../../../api/appApi'
import { useIsFocused } from '@react-navigation/native'
import { ScreenWrapper, BaseButton, BaseTitle } from '../../../components/base/base'
import { familyTaxi } from '../../../images/index'
import MapModal from '../../../components/modals/MapModal'
import CheckServicedArea from '../../../components/client/CheckServicedArea'
import useAsyncRequest from '../../../hooks/useAsyncRequest'
import Loader from '../../../components/Loader'
import { SERVICED_AREA_CENTER } from '../../../../servicedArea'

const SelectOrigin = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { setClientOrigin, route } = useContext(RouteContext)
  const { updateActiveRoute } = useContext(AuthContext)
  const getRoute = useAsyncRequest()
  const { clientOrigin: origin } = route

  useEffect(() => {
    if (!isFocused) return

    getRoute.send(async () => {
      const response = await appApi.get('/users/route')

      //if a user has no route it will update it to null
      updateActiveRoute(response.data.route)

      //navigate user away from this screen if he has an active route
      if (response.data.route) {
        navigation.navigate('TrackDriver')
      }
    })
  }, [isFocused])

  const onPlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location

    setClientOrigin({
      coords: { latitude: lat, longitude: lng },
      address: details.formatted_address,
    })
  }

  return (
    <ScreenWrapper>
      {getRoute.isLoading ? (
        <View className="h-[300px] items-center justify-center">
          <Loader size="large" />
        </View>
      ) : (
        <>
          <MapModal />
          <View className="mt-16">
            <BaseTitle>Skąd mamy cię odebrać?</BaseTitle>
          </View>
          <View className="mt-4">
            <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
          </View>
          <CheckServicedArea />
        </>
      )}
      {origin ? (
        <View>
          <Map
            rounded
            region={{
              latitude: origin.coords.latitude,
              longitude: origin.coords.longitude,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            directions={{ origin: origin.coords }}
          />
          <View className="mt-4">
            <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('SelectDestination')} />
          </View>
        </View>
      ) : (
        <View className="items-center mt-8 p-4" style={getRoute.isLoading ? { display: 'none' } : null}>
          <Image source={familyTaxi} className="w-[400px] h-[200px]" />
        </View>
      )}
    </ScreenWrapper>
  )
}

export default SelectOrigin
