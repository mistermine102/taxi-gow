import { View, Text } from 'react-native'
import { useContext } from 'react'
import AuthContext from '../context/Auth'
import { BaseButton } from '../components/base/base'

const AccountScreen = () => {
  const { user, signout } = useContext(AuthContext)

  if (!user) return null

  return (
    <View className="bg-white flex-1 px-base">
      <View className=" bg-lightGray mt-8 px-8 py-4 rounded-md">
        <View className="flex-row justify-between">
          <Text className="text-[16px] font-bold">Email</Text>
          <Text className="text-[16px]">{user.email}</Text>
        </View>
        <View className="mt-8">
          <BaseButton onPress={signout} title="Wyloguj" />
        </View>
      </View>
    </View>
  )
}

export default AccountScreen
