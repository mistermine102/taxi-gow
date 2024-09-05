import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider as AuthProvider } from './src/context/Auth'
import { Provider as RouteProvider } from './src/context/Route'

import SignupScreen from './src/screens/auth/Signup'
import SigninScreen from './src/screens/auth/Signin'
import ResolveAuthScreen from './src/screens/auth/ResolveAuth'
import SelectRouteOriginScreen from './src/screens/client/routeCreate/SelectOrigin'
import SelectRouteDestinationScreen from './src/screens/client/routeCreate/SelectDestination'
import SelectRouteDriverScreen from './src/screens/client/routeCreate/SelectDriver'
import RouteSummaryScreen from './src/screens/client/routeCreate/Summary'
import TrackDriverScreen from './src/screens/client/TrackDriver'
import DriverRoutesScreen from './src/screens/driver/DriverRoutes'
import AccountScreen from './src/screens/Account'
import SuccessScreen from './src/screens/Success'

import { navigationRef } from './src/RootNavigation'

import AuthContext from './src/context/Auth'
import { useContext } from 'react'
//tamagui
import { TamaguiProvider, createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v3'

const tamaguiConfig = createTamagui(config)

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const RouteCreateNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SelectOrigin" component={SelectRouteOriginScreen} />
      <Stack.Screen name="SelectDestination" component={SelectRouteDestinationScreen} />
      <Stack.Screen name="SelectDriver" component={SelectRouteDriverScreen} />
      <Stack.Screen name="Summary" component={RouteSummaryScreen} />
    </Stack.Navigator>
  )
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerBackVisible: false, title: 'Logowanie' }} name="Signin" component={SigninScreen} />
      <Stack.Screen options={{ headerBackVisible: false, title: 'Rejestracja' }} name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

const MainTabNavigator = () => {
  const { user } = useContext(AuthContext)

  if (!user) return null

  return (
    <Tab.Navigator initialRouteName="RouteCreateStack">
      {user.role === 'client' ? (
        <>
          <Tab.Screen name="TrackDriver" component={TrackDriverScreen} />
          <Tab.Screen options={{ headerShown: false }} name="RouteCreateStack" component={RouteCreateNavigator} />
        </>
      ) : (
        <Tab.Screen name="DriverRoutes" component={DriverRoutesScreen} />
      )}
      <Tab.Screen options={{ headerTitle: 'Konto', tabBarLabel: 'Konto' }} name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="ResolveAuth" component={ResolveAuthScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AuthStack" component={AuthStackNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="MainTab" component={MainTabNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <AuthProvider>
          <RouteProvider>
            <App />
          </RouteProvider>
        </AuthProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
