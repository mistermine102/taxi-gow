import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider as AuthProvider } from './src/context/Auth'

import SignupScreen from './src/screens/auth/Signup'
import SigninScreen from './src/screens/auth/Signin'
import ResolveAuthScreen from './src/screens/auth/ResolveAuth'

import SelectRouteDestinationScreen from './src/screens/routeCreate/SelectDestination'
import SelectRouteDriverScreen from './src/screens/routeCreate/SelectDriver'
import RouteSummaryScreen from './src/screens/routeCreate/Summary'

import DriverTrackScreen from './src/screens/DriverTrack'
import AccountScreen from './src/screens/Account'

import { navigationRef } from './src/RootNavigation'

//tamagui
import { TamaguiProvider, createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v3'

const tamaguiConfig = createTamagui(config)

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const RouteCreateNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectDestination"
        component={SelectRouteDestinationScreen}
      />
      <Stack.Screen name="SelectDriver" component={SelectRouteDriverScreen} />
      <Stack.Screen name="Summary" component={RouteSummaryScreen} />
    </Stack.Navigator>
  )
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerBackVisible: false, title: 'Logowanie' }}
        name="Signin"
        component={SigninScreen}
      />
      <Stack.Screen
        options={{ headerBackVisible: false, title: 'Rejestracja' }}
        name="Signup"
        component={SignupScreen}
      />
    </Stack.Navigator>
  )
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DriverTrack" component={DriverTrackScreen} />
      <Tab.Screen
        options={{ headerShown: false }}
        name="RouteCreateStack"
        component={RouteCreateNavigator}
      />
      <Tab.Screen
        options={{ headerTitle: 'Konto', tabBarLabel: 'Konto' }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="ResolveAuth"
          component={ResolveAuthScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AuthStack"
          component={AuthStackNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainTab"
          component={MainTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
