import colors from '../../colors'
import { BaseIcon } from './base/base'
import { View, Text } from 'react-native'

const NoRoutes = ({ text = 'Nic tu nie ma', iconName = 'ghost' }) => {
  return (
    <View className="items-center">
      <BaseIcon name={iconName} size={128} color={colors.lightGray} />
      <Text className="text-2xl font-bold text-lightGray">{text}</Text>
    </View>
  )
}

export default NoRoutes
