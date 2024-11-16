import { View, Text } from 'react-native'
import { ScreenWrapper, BaseTitle, BaseTile, BaseLabel } from '../../components/base/base'

const PricingScreen = () => {
  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Cennik</BaseTitle>
      </View>
      <BaseTile>
        <Text className="font-bold text-xl text-darkGray">Taryfa od 6:00 do 22:00</Text>
        <BaseLabel label="Cena za wejście" value="15 zł" />
        <BaseLabel label="Cena za kilometr" value="4 zł" />
        <Text className="font-bold text-xl text-darkGray mt-4">Opłata za oczekiwanie</Text>
        <BaseLabel label="Godzina oczekiwania" value="50 zł" />
      </BaseTile>
    </ScreenWrapper>
  )
}

export default PricingScreen
