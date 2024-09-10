import { View } from 'react-native'
import PlacesInput from '../../../components/PlacesInput'
import Map from '../../../components/Map'
import { useContext } from 'react'
import RouteContext from '../../../context/Route'
import { ScreenWrapper, BaseButton, BaseTitle } from '../../../components/base/base'

const SelectDestination = ({ navigation }) => {
  const { route, setDestination } = useContext(RouteContext)
  const { clientOrigin: origin, destination } = route

  const onPlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location
    setDestination({ coords: { latitude: lat, longitude: lng }, address: details.formatted_address })
  }

  return (
    <ScreenWrapper>
      <View className="mt-16">
        <BaseTitle>Dokąd chcesz dojechać?</BaseTitle>
      </View>
      <View className="mt-4">
        <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
      </View>

      {origin ? (
        <View className="mt-8">
          {destination ? (
            <Map rounded directions={{ origin: origin.coords, destination: destination.coords }} />
          ) : (
            <Map rounded directions={{ origin: origin.coords }} />
          )}

          <View className="mt-4 px-8">
            <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('SelectDriver')} />
          </View>
        </View>
      ) : null}
    </ScreenWrapper>
  )
}
export default SelectDestination
