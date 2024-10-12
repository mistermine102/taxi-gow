import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminActions from '../screens/admin/AdminActions'
import ManualRouteCreate from '../screens/admin/ManualRouteCreate'
import AllRoutes from '../screens/admin/AllRoutes'

const Stack = createNativeStackNavigator()

const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ title: 'Akcje Admina' }} name="AdminActions" component={AdminActions} />
      <Stack.Screen options={{ title: 'Stwórz trasę' }} name="ManualRouteCreate" component={ManualRouteCreate} />
      <Stack.Screen options={{ title: 'Wszystkie trasy' }} name="AllRoutes" component={AllRoutes} />
    </Stack.Navigator>
  )
}

export default AdminNavigator
