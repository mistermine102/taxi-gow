import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SelectRouteOriginScreen from '../screens/client/routeCreate/SelectOrigin'
import SelectRouteDestinationScreen from '../screens/client/routeCreate/SelectDestination'
import SelectRouteDriverScreen from '../screens/client/routeCreate/SelectDriver'
import RouteSummaryScreen from '../screens/client/routeCreate/Summary'
import colors from '../../colors'

const Stack = createNativeStackNavigator()

const RouteCreateNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleStyle: { color: colors.darkGray } }}>
      <Stack.Screen options={{ title: 'Punkt startowy' }} name="SelectOrigin" component={SelectRouteOriginScreen} />
      <Stack.Screen options={{ title: 'Punkt docelowy' }} name="SelectDestination" component={SelectRouteDestinationScreen} />
      <Stack.Screen options={{ title: 'Kierowca' }} name="SelectDriver" component={SelectRouteDriverScreen} />
      <Stack.Screen options={{ title: 'Podsumowanie' }} name="Summary" component={RouteSummaryScreen} />
    </Stack.Navigator>
  )
}

export default RouteCreateNavigator
