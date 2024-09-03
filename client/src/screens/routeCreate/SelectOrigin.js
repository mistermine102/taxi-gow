import { Text, View } from 'react-native'
import PlacesInput from '../../components/PlacesInput'
import BaseButton from '../../components/base/BaseButton'
import Map from '../../components/Map'
import { useContext, useEffect } from 'react'
import RouteContext from '../../context/Route'
import appApi from '../../api/appApi'
import { useFocusEffect } from '@react-navigation/native'

const SelectOrigin = ({ navigation }) => {
  const { setClientOrigin, route } = useContext(RouteContext)
  const { clientOrigin: origin } = route

  useFocusEffect(() => {
    const getRoute = async () => {
      //check if logged in user isn't in an active route
      //if he is, then navigate him to tracking a driver
      const response = await appApi.get('/users/route')

      if (response.data.route) {
        navigation.navigate('DriverTrack')
      }
    }
    getRoute()
  })

  const onPlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location
    console.log(details.formatted_address)
    setClientOrigin({ coords: { latitude: lat, longitude: lng }, address: details.formatted_address })
  }

  return (
    <View className="flex-1 bg-white px-base">
      <Text className="text-2xl text-darkGray font-semibold text-center mt-16">Skąd mamy cię odebrać?</Text>
      <View className="mt-4">
        <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
      </View>

      {origin ? (
        <View className="mt-8">
          <Map directions={{ origin: origin.coords }} />
          <View className="mt-4 px-8">
            <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('SelectDestination')} />
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default SelectOrigin
