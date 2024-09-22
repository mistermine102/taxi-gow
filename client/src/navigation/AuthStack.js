import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignupScreen from '../screens/auth/Signup'
import SigninScreen from '../screens/auth/Signin'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerBackVisible: false, title: 'Logowanie' }} name="Signin" component={SigninScreen} />
      <Stack.Screen options={{ headerBackVisible: false, title: 'Rejestracja' }} name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator
