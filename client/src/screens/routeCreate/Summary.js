import { Text, View } from 'react-native'
import BaseButton from '../../components/base/BaseButton'
import { useContext } from 'react'
import RouteContext from '../../context/Route'

const Summary = () => {
  const { route } = useContext(RouteContext)

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
      <BaseButton title="Zapłać" />
    </View>
  )
}
export default Summary
