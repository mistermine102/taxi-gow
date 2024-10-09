import { SuccessToast, ErrorToast, InfoToast } from 'react-native-toast-message'
import colors from '../colors'

const text1Style = {
  fontSize: 16,
  color: colors.darkGray,
}

const text2Style = {
  fontSize: 14,
}

export default {
  success: props => <SuccessToast {...props} text1Style={text1Style} text2Style={text1Style} />,
  error: props => <ErrorToast {...props} text1Style={text1Style} text2Style={text1Style} />,
  info: props => <InfoToast {...props} text1Style={text1Style} text2Style={text1Style} />,
}
