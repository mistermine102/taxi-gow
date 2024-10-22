import { View } from 'react-native'
import { BaseTitle, ScreenWrapper, BaseTile, BaseLabel } from '../../components/base/base'

const AboutFirm = () => {
  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>O firmie</BaseTitle>
      </View>
      <BaseTile>
        <View style={{ gap: 16 }}>
          <BaseLabel label="Pełna nazwa firmy" value="Taxi Gow" alignment="vertical" />
          <BaseLabel label="Siedziba firmy" value="ul. Rynek 5/9, 63-500, Kępno" alignment="vertical" />
          <BaseLabel label="NIP" value="6192044314" alignment="vertical" />
          <BaseLabel label="REGON" value="528639101" alignment="vertical" />
        </View>
      </BaseTile>
    </ScreenWrapper>
  )
}

export default AboutFirm
