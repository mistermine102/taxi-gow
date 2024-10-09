import 'react-native-gesture-handler'
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

const Stack = createNativeStackNavigator()

const App = () => {
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
      <AuthProvider>
        <RouteProvider>
          <App />
        </RouteProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
