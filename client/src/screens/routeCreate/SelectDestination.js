import { View, Text } from 'react-native'
import PlacesInput from '../../components/PlacesInput'
import BaseButton from '../../components/base/BaseButton'
import Map from '../../components/Map'
import { useContext } from 'react'
import RouteContext from '../../context/Route'

const SelectDestination = ({ navigation }) => {
  const { route, setDestination } = useContext(RouteContext)
  const { clientOrigin: origin, destination } = route

  const onPlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location
    setDestination({ latitude: lat, longitude: lng })
  }

  return (
    <View className="flex-1 bg-white px-base">
      <Text className="text-2xl text-darkGray font-semibold text-center mt-16">Dokąd chcesz dojechać?</Text>
      <View className="mt-4">
        <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
      </View>

      {origin ? (
        <View className="mt-8">
          <Map directions={{ origin, destination }} />
          <View className="mt-4 px-8">
            <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('SelectDriver')} />
          </View>
        </View>
      ) : null}
    </View>
  )
}
export default SelectDestination
