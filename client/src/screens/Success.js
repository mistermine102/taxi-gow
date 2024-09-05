import { View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ScreenWrapper, BaseButton, BaseTitle } from '../components/base/base'

const Success = ({ route, navigation }) => {
  const { title } = route.params

  return (
    <ScreenWrapper>
      <View className="mt-32 items-center">
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={128} color="#22c55e" />
        <View className="mt-8">
          <BaseTitle>{title}</BaseTitle>
        </View>
      </View>
      <View className="mt-8">
        <BaseButton title="Zakończ" onPress={() => navigation.navigate('MainTab')} />
      </View>
    </ScreenWrapper>
  )
}

export default Success
