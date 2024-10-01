import { Text, View } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { BaseIcon } from './base/base'

const Toast = ({ title = 'Toast', isVisible = false }) => {
  if (!isVisible) return null

  return (
    <View className="absolute left-0 right-0 top-1 items-center" style={{ elevation: 2, zIndex: 2 }}>
      <Animated.View
        entering={FadeInUp.duration(150)}
        exiting={FadeOutUp.duration(150)}
        className="w-9/12 px-4 py-3 gap-x-1 bg-white rounded-xl"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <BaseIcon name="alert-circle-outline" color="#ef4444" />
        <Text className="text-red-500 font-semibold">{title}</Text>
      </Animated.View>
    </View>
  )
}

export default Toast
