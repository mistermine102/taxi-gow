import RNPhoneInput from 'react-native-phone-number-input'
import colors from '../../colors'

const PhoneInput = ({ value = '', onChangeFormattedText = () => {}, onChangeText = () => {} }) => {
  return (
    <RNPhoneInput
      containerStyle={{
        backgroundColor: colors.lightGray,
        borderRadius: 6,
        paddingVertical: 3,
        width: '100%',
        marginBottom: 16,
      }}
      textContainerStyle={{
        backgroundColor: colors.lightGray,
        paddingBottom: 0,
        paddingTop: 0,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
      }}
      textInputStyle={{ fontSize: 16 }}
      value={value}
      onChangeFormattedText={onChangeFormattedText}
      onChangeText={onChangeText}
      defaultCode="PL"
      placeholder="Numer telefonu"
      layout="first"
    />
  )
}

export default PhoneInput
