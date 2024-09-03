import { Text, View } from 'react-native'
import BaseButton from '../../components/base/BaseButton'
import { useContext, useState } from 'react'
import RouteContext from '../../context/Route'
import appApi from '../../api/appApi'
import { CommonActions } from '@react-navigation/native'

const Summary = ({ navigation }) => {
  const { route, clearRoute } = useContext(RouteContext)
  const [isRouteCreated, setIsRouteCreated] = useState(false)

  const createRoute = async () => {
    try {
      const { latitude: clientLatitude, longitude: clientLongitude } = route.clientOrigin.coords
      const { latitude: destinationLatitude, longitude: destinationLongitude } = route.destination.coords

      const clientOrigin = `${clientLatitude}, ${clientLongitude}`
      const destination = `${destinationLatitude}, ${destinationLongitude}`

      await appApi.post('/routes', {
        clientOrigin,
        destination,
        driverId: route.driver._id,
      })

      setIsRouteCreated(true)

      //clear route context
      clearRoute()

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'RouteCreateStack' }],
        })
      )
      navigation.navigate('Success', { title: 'Kierowca zjawi się w ciągu kilku minut' })
    } catch (err) {
      console.log(err)
    }
  }

  if (isRouteCreated) return null

  return (
    <View className="flex-1 bg-white px-base">
      <Text className="text-2xl text-darkGray font-semibold text-center mt-16">Podsumowanie</Text>
      <View className="my-4 bg-lightGray rounded-md p-2">
        <Text className="text-darkGray mb-1">Punkt startowy: {route.clientOrigin.address}</Text>
        <Text className="text-darkGray mb-1">Punkt końcowy: {route.destination.address}</Text>
        <Text className="text-darkGray mb-1">Długość tasy: ???</Text>
        <Text className="text-darkGray mb-1">Kierowca: {route.driver._id} </Text>
        <Text className="text-darkGray mb-1">Koszt: {route.driver.cost.total.toFixed(2)} zł</Text>
        <Text className="text-darkGray mb-1">Czas oczekiwania: {route.driver.duration.text}</Text>
        <Text className="text-darkGray mb-1">Czas podróży:</Text>
      </View>
      <BaseButton title="Zapłać" onPress={createRoute} />
    </View>
  )
}
export default Summary
