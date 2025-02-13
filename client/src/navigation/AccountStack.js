import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from '../screens/account/Account'
import AccountDetailsScreen from '../screens/account/AccountDetails'
import PrivacyPolicyScreen from '../screens/account/PrivacyPolicy'
import TermsScreen from '../screens/account/Terms'
import AboutFirmScreen from '../screens/account/AboutFirm'
import PreviousRoutesScreen from '../screens/account/PreviousRoutes'
import PricingScreen from '../screens/account/Pricing'
import colors from '../../colors'

const Stack = createNativeStackNavigator()

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleStyle: { color: colors.darkGray } }}>
      <Stack.Screen options={{ title: 'Konto' }} name="Account" component={AccountScreen} />
      <Stack.Screen options={{ title: 'Historia przejazdów' }} name="RoutesHistory" component={PreviousRoutesScreen} />
      <Stack.Screen options={{ title: 'Szczegóły konta' }} name="AccountDetails" component={AccountDetailsScreen} />
      <Stack.Screen options={{ title: 'Polityka prywatności' }} name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen options={{ title: 'Regulamin' }} name="Terms" component={TermsScreen} />
      <Stack.Screen options={{ title: 'Informacje o firmie' }} name="AboutFirm" component={AboutFirmScreen} />
      <Stack.Screen options={{ title: 'Cennik' }} name="Pricing" component={PricingScreen} />
    </Stack.Navigator>
  )
}

export default AccountStack
