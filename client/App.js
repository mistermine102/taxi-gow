import 'react-native-gesture-handler'
import './src/sheets'
import { SheetProvider } from 'react-native-actions-sheet'

import Toast from 'react-native-toast-message'
import toastConfig from './src/toastConfig'

//navigation
import AuthStackNavigator from './src/navigation/AuthStack'
import MainTabNavigator from './src/navigation/MainTab'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { navigationRef } from './src/RootNavigation'

//context
import { Provider as AuthProvider } from './src/context/Auth'
import { Provider as RouteProvider } from './src/context/Route'

//screens
import ResolveAuthScreen from './src/screens/auth/ResolveAuth'
import SuccessScreen from './src/screens/Success'

//ctx
import { useContext, useEffect } from 'react'
import AuthContext from './src/context/Auth'
import io from './src/socket'

const Stack = createNativeStackNavigator()

const App = () => {
  const { user, updateRouteStatus, updateActiveRoute, updateSingleRoute, deleteSingleRoute, addSingleRoute } = useContext(AuthContext)

  const onRouteStatusChanged = newStatus => {
    if (newStatus._id === 5) {
      //status 5 means that route is finished so we can remvoe it from activeRoute
      Toast.show({ type: 'success', text1: 'Przejazd zakończony', text2: 'Twój przejazd został zakończony' })
      updateActiveRoute(null)
      return
    }
    if (newStatus._id === 100) {
      //status 100 means that route is canceled so we can remvoe it from activeRoute
      Toast.show({ type: 'info', text1: 'Przejazd anulowany', text2: 'Twój przejazd został anulowany' })
      updateActiveRoute(null)
      return
    }
    updateRouteStatus(newStatus)
  }

  const onRouteCreated = newRoute => {
    updateActiveRoute(newRoute)
  }

  const onAdminRouteChanged = route => {
    if (route.status._id === 5) {
      deleteSingleRoute(route._id)
      return
    }

    updateSingleRoute(route)
  }

  const onAdminRouteCreated = route => {
    addSingleRoute(route)
  }

  useEffect(() => {
    if (!user) return
    //set up listeners

    io.on('routeStatusChanged', onRouteStatusChanged)
    io.on('routeCreated', onRouteCreated)

    return () => {
      //remove listeners
      io.off('routeStatusChanged', onRouteStatusChanged)
      io.off('routeCreated', onRouteCreated)
    }
  }, [user])

  useEffect(() => {
    //setup admin listeners
    if (!user || !user.roles.includes('admin')) return

    io.on('adminRouteChanged', onAdminRouteChanged)
    io.on('adminRouteCreated', onAdminRouteCreated)

    return () => {
      //remove admin listeners
      io.off('adminRouteChanged', onAdminRouteChanged)
      io.off('adminRouteCreated', onAdminRouteCreated)
    }
  }, [user])

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen options={{ headerShown: false }} name="ResolveAuth" component={ResolveAuthScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AuthStack" component={AuthStackNavigator} />
          <Stack.Screen options={{ headerShown: false }} name="MainTab" component={MainTabNavigator} />
          <Stack.Screen options={{ headerShown: false }} name="Success" component={SuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} visibilityTime={3000} />
    </>
  )
}

export default () => {
  return (
    <SafeAreaProvider>
      <SheetProvider>
        <AuthProvider>
          <RouteProvider>
            <App />
          </RouteProvider>
        </AuthProvider>
      </SheetProvider>
    </SafeAreaProvider>
  )
}
