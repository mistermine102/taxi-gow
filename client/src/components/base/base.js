import { TouchableOpacity, Text, View } from 'react-native'
import { TextInput } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export const BaseButton = ({ alt = false, title = 'Przycisk', onPress = () => {} }) => {
  return (
    <TouchableOpacity
      className={
        alt
          ? 'bg-transparent border border-darkGray items-center rounded-md py-3 mb-2'
          : 'bg-primary border border-primary items-center rounded-md py-3 mb-2'
      }
      onPress={onPress}
    >
      <Text className="font-semibold text-darkGray">{title}</Text>
    </TouchableOpacity>
  )
}

export const BaseInput = ({ value = '', secureTextEntry = false, autoCapitalize = 'none', placeholder = '', onChangeText = () => {} }) => {
  return (
    <TextInput
      value={value}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className="rounded-md mb-4 bg-lightGray px-6 py-3"
    />
  )
}

export const BaseLink = ({ onPress = () => {}, title = 'Link' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="font-semibold text-center">{title}</Text>
    </TouchableOpacity>
  )
}

export const BaseTitle = ({ children }) => {
  return <Text className="text-2xl text-darkGray font-bold text-left">{children}</Text>
}

export const BaseIcon = ({ name, size = 24, color = '#4d4d4d' }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />
}

export const ScreenWrapper = ({ children }) => {
  return <View className="flex-1 bg-white px-base">{children}</View>
}
