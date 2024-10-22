import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import { useEffect } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import colors from '../../../colors'
import { smallShadow } from '../../../shadow'
import Loader from '../Loader'

export const BaseButton = ({ shadow = true, alt = false, title = 'Przycisk', onPress = () => {}, isLoading = false }) => {
  return (
    <TouchableOpacity
      className={
        alt
          ? 'bg-transparent border border-darkGray items-center justify-center rounded-md h-10'
          : 'bg-primary border border-primary items-center justify-center rounded-md h-10'
      }
      onPress={onPress}
    >
      {isLoading ? <Loader /> : <Text className="font-semibold text-darkGray">{title}</Text>}
    </TouchableOpacity>
  )
}

export const BaseInput = ({
  keyboardType = 'default',
  value = '',
  secureTextEntry = false,
  autoCapitalize = 'none',
  placeholder = '',
  onChangeText = () => {},
}) => {
  return (
    <TextInput
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className="rounded-md bg-lightGray px-4 py-3 text-[16px]"
    />
  )
}

export const BaseLink = ({ onPress = () => {}, title = 'Link' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="font-semibold">{title}</Text>
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

export const BaseTile = ({ children }) => {
  return (
    <View className="p-4 bg-lightGray rounded-md" style={smallShadow}>
      {children}
    </View>
  )
}

export const ScreenWrapper = ({ children }) => {
  return <View className="flex-1 bg-white px-base">{children}</View>
}

export const BaseLabel = ({ label, value, alignment = 'horizontal' }) => {
  if (alignment === 'horizontal') {
    return (
      <View className="flex-row justify-between">
        <Text className="text-lg text-darkGray">{label}</Text>
        <Text className="text-lg font-bold text-darkGray">{value}</Text>
      </View>
    )
  }
  if (alignment === 'vertical') {
    return (
      <View>
        <Text className=" text-darkGray">{label}</Text>
        <Text className="text-lg font-semibold text-darkGray">{value}</Text>
      </View>
    )
  }
}
