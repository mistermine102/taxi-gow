import { View } from 'react-native'
import { useContext } from 'react'
import AuthContext from '../../context/Auth'
import { BaseLabel, BaseTile, BaseTitle, ScreenWrapper, BaseButton } from '../../components/base/base'

const AccountDetails = () => {
  const { user, signout } = useContext(AuthContext)

  if (!user) return null

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Szczegóły konta</BaseTitle>
      </View>
      <BaseTile>
        <View style={{ gap: 16 }}>
          <BaseLabel label="Email" value={user.email} alignment='vertical' />
          <BaseLabel label="Nr telefonu" value={user.phoneNumber} alignment='vertical' />
        </View>
      </BaseTile>
      <View className="mt-4">
        <BaseButton icon="logout" onPress={signout} title="Wyloguj" />
      </View>
    </ScreenWrapper>
  )
}

export default AccountDetails
