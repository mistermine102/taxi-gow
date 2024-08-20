import { TextInput } from 'react-native'

const BaseInput = ({ value = '', secureTextEntry = false, autoCapitalize = 'none', placeholder = '', onChangeText = () => {} }) => {
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

export default BaseInput
