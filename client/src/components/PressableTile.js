import { Text, View, TouchableOpacity } from 'react-native'
import { regularShadow } from '../../shadow'
import { BaseIcon } from './base/base'

const PressableTile = ({ children, onPress, title }) => {
  return (
    <TouchableOpacity style={regularShadow} className="bg-white rounded-md flex-row justify-between items-center p-4" onPress={onPress}>
      <View>
        {title ? <Text className=" text-darkGray font-bold text-[16px]">{title}</Text> : null}
        {children ? <View>{children}</View> : null}
      </View>
      <View>
        <BaseIcon name="chevron-right" size={28}/>
      </View>
    </TouchableOpacity>
  )
}

export default PressableTile
