import { View, Text } from 'react-native'
import { BaseIcon, BaseTile, BaseTitle, ScreenWrapper } from '../../components/base/base'
import PressableTile from '../../components/PressableTile'
import { useContext } from 'react'
import AuthContext from '../../context/Auth'
import IsAvailable from '../../components/driver/IsAvailable'

const AccountScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)

  if (!user) return null

  const tiles = [
    {
      title: 'Historia przejazdów',
      screenName: 'RoutesHistory',
      icon: 'history',
    },
    {
      title: 'Szczegóły konta',
      screenName: 'AccountDetails',
      icon: 'account-details',
    },
    {
      title: 'Cennik',
      screenName: 'Pricing',
      icon: 'currency-usd',
    },
    {
      title: 'Regulamin',
      screenName: 'Terms',
      icon: 'gavel',
    },
    {
      title: 'Polityka prywatności',
      screenName: 'PrivacyPolicy',
      icon: 'file-document',
    },
    {
      title: 'O firmie',
      screenName: 'AboutFirm',
      icon: 'taxi',
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
              <IsAvailable />
            </View>
          </BaseTile>
        </View>
      ) : null}
      <View style={{ gap: 8 }}>
        {tiles.map((tile, index) => (
          <PressableTile key={index} onPress={() => navigation.navigate(tile.screenName)}>
            <View className="flex-row items-center" style={{ gap: 8 }}>
              <BaseIcon name={tile.icon} />
              <Text className="font-semibold text-darkGray">{tile.title}</Text>
            </View>
          </PressableTile>
        ))}
      </View>
    </ScreenWrapper>
  )
}

export default AccountScreen
