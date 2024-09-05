import { Text, View } from 'react-native'
import { useContext, useState } from 'react'
import RouteContext from '../../../context/Route'
import appApi from '../../../api/appApi'
import { CommonActions } from '@react-navigation/native'
import { ScreenWrapper, BaseButton, BaseTitle } from '../../../components/base/base'

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
    <ScreenWrapper>
      <View className="mt-16">
        <BaseTitle>Podsumowanie</BaseTitle>
      </View>
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
    </ScreenWrapper>
  )
}
export default Summary
