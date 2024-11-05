import { FlatList, Text, View } from 'react-native'
import { ScreenWrapper, BaseTitle, BaseIcon } from '../../../components/base/base'
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
  ]

  const handleRouteCreate = async () => {
    createRoute.send(async () => {
      const { latitude: clientLatitude, longitude: clientLongitude } = route.clientOrigin.coords
      const { latitude: destinationLatitude, longitude: destinationLongitude } = route.destination.coords

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
      <View style={{ gap: 16 }}>
        <FlatList
          data={PAYMENT_METHODS}
          keyExtractor={item => item.id}
          renderItem={({ item: paymentMethod }) => (
            <PressableTile onPress={() => setSelectedPaymentMethod()} showIcon={false}>
              <View className="items-center py-4">
                <Text className="text-darkGray font-bold text-xl mb-2">{paymentMethod.title}</Text>
                <BaseIcon name={paymentMethod.icon} size={64} color={colors.primary} />
              </View>
            </PressableTile>
          )}
        />
      </View>
    </ScreenWrapper>
  )
}

export default SelectPaymentMethodScreen
