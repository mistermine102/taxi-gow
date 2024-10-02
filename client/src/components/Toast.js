import { Text, View } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { BaseIcon } from './base/base'
import { LinearGradient } from 'expo-linear-gradient'
import { regularShadow } from '../../shadow'

const Toast = ({ title = 'Toast', isVisible = false }) => {
  if (!isVisible) return null

  return (
    <View className="absolute left-0 right-0 top-1 items-center" style={{ elevation: 2, zIndex: 2, paddingHorizontal: 32 }}>
      <Animated.View entering={FadeInUp.duration(150)} exiting={FadeOutUp.duration(150)} style={regularShadow}>
        <LinearGradient
          style={{
            paddingHorizontal: 12,
            paddingVertical: 16,
            columnGap: 4,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          colors={['#dc2626', '#ef4444']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 2 }}
        >
          <BaseIcon name="alert-circle-outline" color="white" />
          <Text className="text-white font-semibold">{title}</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  )
}

export default Toast
