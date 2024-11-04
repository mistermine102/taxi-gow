import { View } from 'react-native'
import { useContext } from 'react'
import RouteContext from '../../../context/Route'
import { ScreenWrapper, BaseTitle } from '../../../components/base/base'
import SelectPointForm from '../../../components/SelectPointForm'

const SelectDestination = ({ navigation }) => {
  const { route, setDestination } = useContext(RouteContext)
  const { clientOrigin, destination } = route

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
        onContinue={() => navigation.navigate('SelectDriver')}
      />
    </ScreenWrapper>
  )
}
export default SelectDestination
