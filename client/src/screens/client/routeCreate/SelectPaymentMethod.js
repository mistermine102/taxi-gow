import { Text, View } from 'react-native'
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
  const [isRouteCreated, setIsRouteCreated] = useState(false)

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

      setIsRouteCreated(true)

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
        <PressableTile onPress={handleRouteCreate} showIcon={false}>
          <View className="items-center py-4">
            <Text className="text-darkGray font-bold text-xl mb-2">Zapłać teraz</Text>
            <BaseIcon name="contactless-payment-circle-outline" size={64} color={colors.primary} />
          </View>
        </PressableTile>
        <PressableTile onPress={handleRouteCreate} showIcon={false}>
          <View className="items-center py-4">
            <Text className="text-darkGray font-bold text-xl mb-2">Zapłać w taksówce</Text>
            <BaseIcon name="taxi" size={64} color={colors.primary} />
          </View>
        </PressableTile>
      </View>
    </ScreenWrapper>
  )
}

export default SelectPaymentMethodScreen
