import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { BaseIcon, BaseTile } from './base/base'

const RouteItem = ({
  children,
  callable = false,
  licensePlate,
  name,
  status,
  destination,
  origin,
  additionalRows = [],
  onOptionsPress = () => {},
}) => {
  const { text: textColor, background: bgColor } = status.colors

  return (
    <BaseTile>
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          {callable ? (
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${name}`)}>
              <Text className="text-xl font-bold text-darkGray">{`${name.slice(0, 15)}${name.length > 15 ? '...' : ''}`}</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-xl font-bold text-darkGray">{`${name.slice(0, 15)}${name.length > 15 ? '...' : ''}`}</Text>
          )}

          {licensePlate ? (
            <View className="bg-white px-4 py-2 rounded-sm ml-2 border-black border">
              <Text className="font-bold text-darkGray">{licensePlate}</Text>
            </View>
          ) : null}
        </View>
        <View className="flex-row">
          <View style={{ backgroundColor: bgColor }} className="px-2 py-1 rounded-full">
            <Text style={{ color: textColor }} className="font-semibold">
              {status.title}
            </Text>
          </View>

          <TouchableOpacity onPress={onOptionsPress}>
            <BaseIcon name="dots-vertical" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ gap: 2 }}>
        <View className="flex-row items-center" style={{gap: 2}}>
          <BaseIcon name="map-marker" />
          <Text className="text-lg">{`${origin.slice(0, 25)}${origin.length > 25 ? '...' : ''}`}</Text>
        </View>
        <View className="flex-row items-center" style={{gap: 2}}>
          <BaseIcon name="crosshairs-gps" />
          <Text className="text-lg">{`${destination.slice(0, 25)}${destination.length > 25 ? '...' : ''}`}</Text>
        </View>
        {additionalRows.map((row, index) => (
          <View key={index} className="flex-row items-center" style={{gap: 2}}>
            <BaseIcon name={row.icon} />
            <Text className="text-lg">{row.text}</Text>
          </View>
        ))}
      </View>

      {/* controls */}
      <View className="mt-4">{children}</View>
    </BaseTile>
  )
}

export default RouteItem
