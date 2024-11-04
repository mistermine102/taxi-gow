import { View } from 'react-native'
import { useContext, useEffect } from 'react'
import RouteContext from '../../../context/Route'
import AuthContext from '../../../context/Auth'
import appApi from '../../../api/appApi'
import { useIsFocused } from '@react-navigation/native'
import { ScreenWrapper, BaseTitle } from '../../../components/base/base'
import useAsyncRequest from '../../../hooks/useAsyncRequest'
import Loader from '../../../components/Loader'
import SelectPointForm from '../../../components/SelectPointForm'

const SelectOrigin = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { route, setClientOrigin } = useContext(RouteContext)
  const { updateActiveRoute } = useContext(AuthContext)
  const getRoute = useAsyncRequest()
  const { clientOrigin } = route

  const clientOriginPoint = clientOrigin
    ? {
        ...clientOrigin.coords,
        name: 'clientOrigin',
      }
    : null

  useEffect(() => {
    if (!isFocused) return

    getRoute.send(async () => {
      const response = await appApi.get('/users/route')

      //if a user has no route it will update it to null
      updateActiveRoute(response.data.route)

      //navigate user away from this screen if he has an active route
      if (response.data.route) {
        navigation.navigate('TrackDriver')
      }
    })
  }, [isFocused])

  return (
    <ScreenWrapper>
      {getRoute.isLoading ? (
        <View className="h-[300px] items-center justify-center">
          <Loader size="large" />
        </View>
      ) : (
        <>
          <View className="mt-16 mb-4">
            <BaseTitle>Skąd mamy cię odebrać?</BaseTitle>
          </View>
          <SelectPointForm
            point={clientOriginPoint}
            allPoints={[clientOriginPoint]}
            onPointAdded={p => setClientOrigin({ coords: p })}
            onContinue={() => navigation.navigate('SelectDestination')}
          />
        </>
      )}
    </ScreenWrapper>
  )
}

export default SelectOrigin
