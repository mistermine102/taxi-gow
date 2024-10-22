import { View, Text } from 'react-native'
import { BaseTile, BaseTitle, ScreenWrapper } from '../../components/base/base'
import PressableTile from '../../components/PressableTile'
import { useContext } from 'react'
import AuthContext from '../../context/Auth'
import IsAvailable from '../../components/driver/IsAvailable'

const AccountScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)

  if (!user) return null

  const tiles = [
    {
      title: 'Szczegóły konta',
      screenName: 'AccountDetails',
    },
    {
      title: 'Regulamin',
      screenName: 'Terms',
    },
    {
      title: 'Polityka prywatności',
      screenName: 'PrivacyPolicy',
    },
    {
      title: 'O firmie',
      screenName: 'AboutFirm',
    },
  ]

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Konto</BaseTitle>
      </View>
      {user.roles.includes('driver') ? (
        <View className="mb-4">
          <BaseTile>
            <View>
              <IsAvailable/>
            </View>
          </BaseTile>
        </View>
      ) : null}
      <View style={{ gap: 8 }}>
        {tiles.map((tile, index) => (
          <PressableTile key={index} onPress={() => navigation.navigate(tile.screenName)}>
            <Text className="font-semibold text-darkGray">{tile.title}</Text>
          </PressableTile>
        ))}
      </View>
    </ScreenWrapper>
  )
}

export default AccountScreen
