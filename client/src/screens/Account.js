import { View, Text } from 'react-native'
import { useContext } from 'react'
import AuthContext from '../context/Auth'
import { BaseButton, BaseTitle, ScreenWrapper } from '../components/base/base'

const AccountScreen = () => {
  const { user, signout } = useContext(AuthContext)

  if (!user) return null

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Szczegóły konta</BaseTitle>
      </View>
      <View className=" bg-lightGray px-8 py-4 rounded-md">
        <View className="flex-row justify-between">
          <Text>Email</Text>
          <Text>{user.email}</Text>
        </View>
        <View className="mt-8">
          <BaseButton onPress={signout} title="Wyloguj" />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default AccountScreen
