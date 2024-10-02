import { ActivityIndicator } from 'react-native'
import colors from '../../colors'

const Loader = ({ size = 'small' }) => {
  return <ActivityIndicator size={size} color={colors.darkGray} />
}

export default Loader
