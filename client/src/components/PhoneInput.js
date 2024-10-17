import RNPhoneInput from 'react-native-phone-number-input'
import colors from '../../colors'

const PhoneInput = ({ placeholder = 'Numer telefonu', value = '', onChangeFormattedText = () => {}, onChangeText = () => {} }) => {
  return (
    <RNPhoneInput
      containerStyle={{
        backgroundColor: colors.lightGray,
        borderRadius: 6,
        width: '100%',
      }}
      textContainerStyle={{
        backgroundColor: colors.lightGray,
        paddingBottom: 12,
        paddingTop: 12,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
      }}
      textInputStyle={{ fontSize: 16 }}
      value={value}
      onChangeFormattedText={onChangeFormattedText}
      onChangeText={onChangeText}
      defaultCode="PL"
      placeholder={placeholder}
      layout="first"
    />
  )
}

export default PhoneInput
