import { View, Text } from 'react-native'
import { BaseIcon } from './base/base'

const RouteItem = ({ children, name, status, destination, origin }) => {
  const { text: textColor, background: bgColor } = status.colors
  // const textColor = '#9333ea'
  // const bgColor = '#e9d5ff'

  return (
    <View className="bg-lightGray rounded-md p-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xl font-semibold">{`${name.slice(0, 20)}${name.length > 20 ? '...' : ''}`}</Text>
        <View style={{ backgroundColor: bgColor }} className="px-2 py-1 rounded-full">
          <Text style={{ color: textColor }} className="font-semibold">
            {status.title}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-x-1 items-center">
        <BaseIcon name="map-marker" />
        <Text className="text-lg">{`${origin.slice(0, 25)}${origin.length > 25 ? '...' : ''}`}</Text>
      </View>
      <View className="flex-row items-center gap-x-1 mb-4">
        <BaseIcon name="crosshairs-gps" />
        <Text className="text-lg">{`${destination.slice(0, 25)}${destination.length > 25 ? '...' : ''}`}</Text>
      </View>
      {/* controls */}
      <View>{children}</View>
    </View>
  )
}

export default RouteItem
