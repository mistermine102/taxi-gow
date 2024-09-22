import 'react-native-gesture-handler'
import { NotoSans_400Regular, NotoSans_600SemiBold, NotoSans_700Bold, useFonts } from '@expo-google-fonts/noto-sans'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

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

const Stack = createNativeStackNavigator()

const App = () => {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
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
      <AuthProvider>
        <RouteProvider>
          <App />
        </RouteProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
