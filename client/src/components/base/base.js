import { TouchableOpacity, Text, View } from 'react-native'
import { TextInput } from 'react-native'

export const BaseButton = ({ title = 'Przycisk', onPress = () => {} }) => {
  return (
    <TouchableOpacity className="bg-primary items-center rounded-md py-3 mb-2" onPress={onPress}>
      <Text className="text-[16px] font-semibold text-darkGray">{title}</Text>
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
      className="text-[16px] rounded-lg mb-4 bg-lightGray px-6 py-3"
    />
  )
}

export const BaseLink = ({ onPress = () => {}, title = 'Link' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="font-semibold text-center text-darkGray">{title}</Text>
    </TouchableOpacity>
  )
}

export const BaseTitle = ({ children }) => {
  return <Text className="text-2xl text-darkGray font-semibold text-center">{children}</Text>
}

export const ScreenWrapper = ({ children }) => {
  return <View className="flex-1 bg-white px-base">{children}</View>
}
