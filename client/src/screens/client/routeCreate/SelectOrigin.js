import { View } from 'react-native'
import PlacesInput from '../../../components/PlacesInput'
import Map from '../../../components/Map'
import { useContext, useEffect } from 'react'
import RouteContext from '../../../context/Route'
import appApi from '../../../api/appApi'
import { useIsFocused } from '@react-navigation/native'
import { ScreenWrapper, BaseButton, BaseTitle } from '../../../components/base/base'

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
      <View className="mt-16">
        <BaseTitle>Skąd mamy cię odebrać?</BaseTitle>
      </View>
      <View className="mt-4">
        <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
      </View>

      {origin ? (
        <View className="mt-8">
          <Map rounded directions={{ origin: origin.coords }} />
          <View className="mt-4 px-8">
            <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('SelectDestination')} />
          </View>
        </View>
      ) : null}
    </ScreenWrapper>
  )
}

export default SelectOrigin
