import { View } from 'react-native'
import { useContext } from 'react'
import RouteContext from '../../../context/Route'
import { ScreenWrapper, BaseTitle } from '../../../components/base/base'
import SelectPointForm from '../../../components/SelectPointForm'
import useAsyncRequest from '../../../hooks/useAsyncRequest'
import appApi from '../../../api/appApi'

const SelectDestination = ({ navigation }) => {
  const { route, setDestination, setClientOrigin, setDistance, setDuration, selectDriver } = useContext(RouteContext)
  const { clientOrigin, destination } = route
  const getOptimalDriver = useAsyncRequest()

  const destinationPoint = destination
    ? {
        ...destination.coords,
        name: 'destination',
      }
    : null

  const clientOriginPoint = clientOrigin
    ? {
        ...clientOrigin.coords,
        name: 'clientOrigin',
      }
    : null

  const handleContinuePress = () => {
    //find the best driver
    getOptimalDriver.send(async () => {
      const response = await appApi.get('/drivers/optimal', {
        params: {
          origin: `${clientOrigin.coords.latitude},${clientOrigin.coords.longitude}`,
          destination: `${destination.coords.latitude}, ${destination.coords.longitude}`,
        },
      })

      setClientOrigin({ ...route.clientOrigin, address: response.data.route.clientOriginAddress })
      setDestination({ ...route.destination, address: response.data.route.destinationAddress })
      setDistance(response.data.route.distance)
      setDuration(response.data.route.duration)
      selectDriver(response.data.optimalDriver)

      navigation.navigate('Summary')
    })
  }

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Dokąd chcesz dojechać?</BaseTitle>
      </View>
      <SelectPointForm
        point={destinationPoint}
        allPoints={[clientOriginPoint, destinationPoint]}
        onPointAdded={p => setDestination({ coords: p })}
        directions={clientOrigin && destination ? { origin: clientOrigin.coords, destination: destination.coords } : undefined}
        onContinue={handleContinuePress}
        isContinueButtonLoading={getOptimalDriver.isLoading}
      />
    </ScreenWrapper>
  )
}
export default SelectDestination
