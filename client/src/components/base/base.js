import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import { useEffect } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import colors from '../../../colors'

export const BaseButton = ({ alt = false, title = 'Przycisk', onPress = () => {} }) => {
  return (
    <TouchableOpacity
      className={
        alt
          ? 'bg-transparent border border-darkGray items-center rounded-md py-3 mb-2'
          : 'bg-primary border border-primary items-center rounded-md py-3 mb-2'
      }
      onPress={onPress}
    >
      <Text className="font-semibold text-darkGray">{title}</Text>
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
      className="rounded-md mb-4 bg-lightGray px-6 py-3"
    />
  )
}

export const BaseLink = ({ onPress = () => {}, title = 'Link' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="font-semibold text-center">{title}</Text>
    </TouchableOpacity>
  )
}

export const BaseTitle = ({ children }) => {
  return <Text className="text-2xl text-darkGray font-bold text-left">{children}</Text>
}

export const BaseIcon = ({ name, size = 24, color = '#4d4d4d' }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />
}

export const BaseSwitch = ({ value, onPress, disabled }) => {
  const SWITCH_WIDTH = 60
  const SWITCH_HEIGHT = 24
  const BALL_WIDTH = 20
  const HORIZONTAL_PADDING = 2

  const ballTransform = SWITCH_WIDTH - BALL_WIDTH - HORIZONTAL_PADDING * 2

  const isOn = useSharedValue(value)

  const innerBoxStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isOn.value ? colors.primary : colors.lightGray),
      transform: [{ translateX: withTiming(isOn.value ? ballTransform : 0) }],
    }
  }, [isOn])

  const outerBoxStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isOn.value ? colors.darkGray : '#d1d5db'),
    }
  }, [isOn])

  useEffect(() => {
    isOn.value = value
  }, [value])

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Animated.View
        style={[
          {
            height: SWITCH_HEIGHT,
            width: SWITCH_WIDTH,
            paddingHorizontal: HORIZONTAL_PADDING,
            justifyContent: 'center',
            borderRadius: 16,
            backgroundColor: colors.darkGray,
          },
          outerBoxStyles,
        ]}
      >
        <Animated.View
          style={[{ height: BALL_WIDTH, width: BALL_WIDTH, backgroundColor: colors.darkGray, borderRadius: 100 }, innerBoxStyles]}
        ></Animated.View>
      </Animated.View>
    </TouchableOpacity>
  )
}

export const ScreenWrapper = ({ children }) => {
  return <View className="flex-1 bg-white px-base">{children}</View>
}
