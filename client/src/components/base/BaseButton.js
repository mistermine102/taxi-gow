import { TouchableOpacity, Text } from 'react-native'

const BaseButton = ({ title = 'Przycisk', onPress = () => {} }) => {
  return (
    <TouchableOpacity className="bg-primary items-center rounded-md py-3 mb-2" onPress={onPress}>
      <Text className="text-[16px] font-semibold text-darkGray">{title}</Text>
    </TouchableOpacity>
  )
}

export default BaseButton
