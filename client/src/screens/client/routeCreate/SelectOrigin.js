import { Image, View } from 'react-native'
import PlacesInput from '../../../components/PlacesInput'
import Map from '../../../components/Map'
import { useContext, useEffect } from 'react'
import RouteContext from '../../../context/Route'
import appApi from '../../../api/appApi'
import { useIsFocused } from '@react-navigation/native'
import { ScreenWrapper, BaseButton, BaseTitle } from '../../../components/base/base'
import { familyTaxi } from '../../../images/index'
import MapModal from '../../../components/modals/MapModal'
import CheckServicedArea from '../../../components/client/CheckServicedArea'

const SelectOrigin = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { setClientOrigin, route } = useContext(RouteContext)
  const { clientOrigin: origin } = route

  useEffect(() => {
    if (!isFocused) return

    const getRoute = async () => {
      //check if logged in user isn't in an active route
      //if he is, then navigate him to tracking a driver
      const response = await appApi.get('/users/route')

      if (response.data.route) {
        navigation.navigate('TrackDriver')
      }
    }
    getRoute()
  }, [isFocused])

  const onPlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location
    setClientOrigin({ coords: { latitude: lat, longitude: lng }, address: details.formatted_address })
  }

  return (
    <ScreenWrapper>
      <MapModal />
      <View className="mt-16">
        <BaseTitle>Skąd mamy cię odebrać?</BaseTitle>
      </View>
      <View className="mt-4">
        <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
      </View>
      <CheckServicedArea />
      {origin ? (
        <View className="mt-8">
          <Map rounded region={{ latitude: 17, longitude: 52, latitudeDelta: 0.5, longitudeDelta: 0.5 }} directions={{ origin: origin.coords }} />
          <View className="mt-4">
            <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('SelectDestination')} />
          </View>
        </View>
      ) : (
        <View className="items-center mt-8 p-4">
          <Image source={familyTaxi} className="w-[400px] h-[200px]" />
        </View>
      )}
    </ScreenWrapper>
  )
}

export default SelectOrigin
