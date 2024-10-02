import { View, Text } from 'react-native'
import { useContext } from 'react'
import AuthContext from '../context/Auth'
import { BaseButton, BaseTitle, ScreenWrapper, BaseTile } from '../components/base/base'
import IsAvailable from '../components/driver/IsAvailable'

const AccountScreen = () => {
  const { user, signout } = useContext(AuthContext)

  if (!user) return null

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Szczegóły konta</BaseTitle>
      </View>
      <BaseTile>
        <View className="flex-row justify-between items-center">
          <Text>Email</Text>
          <Text>{user.email}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text>Numer telefonu</Text>
          <Text>{user.phoneNumber}</Text>
        </View>
        {user.role === 'driver' ? <IsAvailable /> : null}
      </BaseTile>
      <View className="mt-4">
        <BaseButton onPress={signout} title="Wyloguj" />
      </View>
    </ScreenWrapper>
  )
}

export default AccountScreen
