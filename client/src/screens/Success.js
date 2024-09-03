import { View, Text } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import BaseButton from '../components/base/BaseButton'

const Success = ({ route, navigation }) => {
  const { title } = route.params

  return (
    <View className="flex-1 bg-white px-base">
      <View className="mt-32 items-center">
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={128} color="#22c55e" />
        <Text className="text-2xl text-darkGray font-semibold text-center mt-8">{title}</Text>
      </View>
      <View className="mt-8">
        <BaseButton title="Zakończ" onPress={() => navigation.navigate('MainTab')} />
      </View>
    </View>
  )
}

export default Success
