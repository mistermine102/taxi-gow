import { View, Text, ScrollView } from 'react-native'
import { useContext, useState } from 'react'
import RouteContext from '../../../context/Route'
import { ScreenWrapper, BaseButton, BaseTitle, BaseLabel, BaseTile } from '../../../components/base/base'
import moment from 'moment'

const Summary = ({ navigation }) => {
  const { route } = useContext(RouteContext)

  const navigateToSelectPaymentMethod = () => {
    navigation.navigate('SelectPaymentMethod')
  }

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Podsumowanie</BaseTitle>
      </View>
      <BaseTile>
        <ScrollView>
          <View className="mt-2">
            <BaseLabel alignment="vertical" label="Punkt startowy" value={route.clientOrigin.address} />
          </View>
          <View className="mt-2">
            <BaseLabel alignment="vertical" label="Punkt końcowy" value={route.destination.address} />
          </View>
          <View className="mt-2">
            <BaseLabel alignment="vertical" label="Kierowca" value={route.driver.name} />
          </View>
          <View className="flex-row mt-2 items-center">
            <View className="flex-1">
              <BaseLabel alignment="vertical" label="Planowany czas oczekiwania" value={`${route.driver.waitTime} min`} />
            </View>
            <View className="flex-1">
              <BaseLabel alignment="vertical" label="Planowany czas podróży" value={`${route.duration} min`} />
            </View>
          </View>
          <View className="flex-row mt-2">
            <View className="flex-1">
              <BaseLabel alignment="vertical" label="Długość przejazdu" value={`${route.distance} km`} />
            </View>
            <View className="flex-1">
              <BaseLabel alignment="vertical" label="Cena umowna" value={`${route.driver.cost.total.toFixed(2)} zł`} />
            </View>
          </View>
        </ScrollView>
      </BaseTile>
      <View className="mt-4">
        <BaseButton title="Przejdź do płatności" onPress={navigateToSelectPaymentMethod} />
      </View>
    </ScreenWrapper>
  )
}
export default Summary
