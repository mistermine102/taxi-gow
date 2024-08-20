import { Text, TouchableOpacity } from 'react-native'

const BaseLink = ({ onPress = () => {}, title = 'Link' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="font-semibold text-center text-darkGray">{title}</Text>
    </TouchableOpacity>
  )
}

export default BaseLink
