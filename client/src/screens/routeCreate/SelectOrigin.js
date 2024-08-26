import { Text, View } from 'react-native'
import PlacesInput from '../../components/PlacesInput'
import BaseButton from '../../components/base/BaseButton'
import Map from '../../components/Map'
import { useContext } from 'react'
import RouteContext from '../../context/Route'

const SelectOrigin = ({navigation}) => {
  const { setClientOrigin, route } = useContext(RouteContext)
  const { clientOrigin: origin } = route

  const onPlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location
    setClientOrigin({ latitude: lat, longitude: lng })
  }

  return (
    <View className="flex-1 bg-white px-base">
      <Text className="text-2xl text-darkGray font-semibold text-center mt-16">Skąd mamy cię odebrać?</Text>
      <View className="mt-4">
        <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
      </View>

      {origin ? (
        <View className="mt-8">
          <Map directions={{ origin }} />
          <View className="mt-4 px-8">
            <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('SelectDestination')} />
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default SelectOrigin
