import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import RouteContext from '../../../context/Route'
import { ScreenWrapper, BaseButton, BaseTitle, BaseLabel, BaseTile } from '../../../components/base/base'
import Checkbox from 'expo-checkbox'
import colors from '../../../../colors'
import Toast from 'react-native-toast-message'

const Summary = ({ navigation }) => {
  const { route } = useContext(RouteContext)
  const [isTermsChecked, setIsTermChecked] = useState(false)

  const navigateToSelectPaymentMethod = () => {
    if (!isTermsChecked) {
      Toast.show({ type: 'error', text1: 'Zaznacz wymagane pola', text2: 'Zaznacz wymagane pola aby przejść dalej' })
      return
    }
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
        <View className="flex-row  items-center mt-2">
          <TouchableOpacity onPress={() => setIsTermChecked(!isTermsChecked)} className="flex-row items-center" style={{ gap: 4 }}>
            <Checkbox value={isTermsChecked} color={isTermsChecked ? colors.primary : undefined} onValueChange={setIsTermChecked} />
            <View className="flex-row" style={{ gap: 2 }}>
              <Text>Akceptuję</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AccountStack')}>
                <Text className="font-bold underline">regulamin aplikacji</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <Text className=" text-red-600 ml-1">Wymagane</Text>
        </View>
      </View>
    </ScreenWrapper>
  )
}
export default Summary
