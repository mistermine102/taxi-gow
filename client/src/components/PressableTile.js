import { Text, View, TouchableOpacity } from 'react-native'
import { regularShadow } from '../../shadow'
import { BaseIcon } from './base/base'
import colors from '../../colors'

const PressableTile = ({ children, onPress, title, showIcon = true, isSelected = false }) => {
  return (
    <TouchableOpacity style={{...regularShadow, backgroundColor: isSelected ? colors.primary : 'white'}} className="rounded-md flex-row justify-between items-center p-4 border border-lightGray" onPress={onPress}>
      <View className="flex-1">
        {title ? <Text className=" text-darkGray font-bold text-[16px]">{title}</Text> : null}
        {children ? <View>{children}</View> : null}
      </View>
      {showIcon ? (
        <View>
          <BaseIcon name="chevron-right" size={28} />
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

export default PressableTile
