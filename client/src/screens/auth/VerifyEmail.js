import colors from '../../../colors'
import { BaseButton, BaseIcon, BaseTitle, ScreenWrapper } from '../../components/base/base'
import { View, Text } from 'react-native'

const VerifyEmail = ({ navigation, route }) => {

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center pt-32">
        <BaseTitle>Potwierdź adres email</BaseTitle>
        <View className="mt-2">
          <Text>
            Na adres <Text className="font-bold text-darkGray">{route.params.email}</Text> został wysłany link. Kliknij w niego aby aktywować konto.
          </Text>
        </View>

        <BaseIcon name="email-fast" size={200} color={colors.lightGray} />
        <View className="w-full">
          <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('Signin')} />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default VerifyEmail
