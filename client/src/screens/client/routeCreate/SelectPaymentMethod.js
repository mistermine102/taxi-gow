import { FlatList, Text, View } from 'react-native'
import {
  ScreenWrapper,
  BaseTitle,
  BaseIcon,
  BaseButton,
} from '../../../components/base/base'
import PressableTile from '../../../components/PressableTile'
import colors from '../../../../colors'
import { useContext, useState } from 'react'
import RouteContext from '../../../context/Route'
import appApi from '../../../api/appApi'
import { CommonActions } from '@react-navigation/native'
import useAsyncRequest from '../../../hooks/useAsyncRequest'

const SelectPaymentMethodScreen = ({ navigation }) => {
  const { route, clearRoute } = useContext(RouteContext)
  const createRoute = useAsyncRequest()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState()

  const PAYMENT_METHODS = [
    {
      id: 1,
      name: 'inApp',
      title: 'Zapłać teraz',
      icon: 'contactless-payment-circle-outline',
    },
    {
      id: 2,
      name: 'inPerson',
      title: 'Zapłać w taksówce',
      icon: 'taxi',
    },
  ]

  const handleRouteCreate = async () => {
    createRoute.send(async () => {
      const { latitude: clientLatitude, longitude: clientLongitude } =
        route.clientOrigin.coords
      const { latitude: destinationLatitude, longitude: destinationLongitude } =
        route.destination.coords

      const clientOrigin = `${clientLatitude}, ${clientLongitude}`
      const destination = `${destinationLatitude}, ${destinationLongitude}`

      await appApi.post('/routes', {
        clientOrigin,
        destination,
        driverId: route.driver._id,
      })

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'RouteCreateStack' }],
        })
      )

      navigation.navigate('Success', { title: `Kierowca zjawi się w wkrótce` })

      //clear route context
      clearRoute()
    })
  }

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Wybierz metodę płatności</BaseTitle>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{
            gap: 16,
            paddingVertical: 16,
          }}
          data={PAYMENT_METHODS}
          keyExtractor={(item) => item.id}
          renderItem={({ item: paymentMethod }) => (
            <PressableTile
              isSelected={paymentMethod.id === selectedPaymentMethod?.id}
              onPress={() => setSelectedPaymentMethod(paymentMethod)}
              showIcon={false}
            >
              <View className="items-center py-4">
                <Text className="text-darkGray font-bold text-xl mb-2">
                  {paymentMethod.title}
                </Text>
                <BaseIcon
                  name={paymentMethod.icon}
                  size={64}
                  color={
                    paymentMethod.id === selectedPaymentMethod?.id
                      ? colors.darkGray
                      : colors.primary
                  }
                />
              </View>
            </PressableTile>
          )}
        />
        {selectedPaymentMethod ? (
          <View>
            <BaseButton onPress={handleRouteCreate} isLoading={createRoute.isLoading} title="Zamów przejazd" />
            <Text className="text-xs mt-2">
              *Zamawiając przejazd wyrażasz zgodę na zawarcie umowy przejazdu
            </Text>
          </View>
        ) : null}
      </View>
    </ScreenWrapper>
  )
}

export default SelectPaymentMethodScreen
