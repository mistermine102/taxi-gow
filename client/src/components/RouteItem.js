import { View, Text } from 'react-native'
import { BaseIcon, BaseButton } from './base/base'

const RouteItem = ({ userType, name, status, destination, origin }) => {
  return (
    <View className="bg-lightGray rounded-md p-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xl text-darkGray font-semibold">{`${name.slice(0, 20)}${name.length > 20 ? '...' : ''}`}</Text>
        <View className="bg-yellow-200 px-2 py-1 rounded-full">
          <Text className="text-yellow-700">{status}</Text>
        </View>
      </View>
      <View className="flex-row gap-x-1 items-center">
        <BaseIcon name="map-marker" />
        <Text className="text-darkGray text-lg">{`${origin.slice(0, 25)}${origin.length > 25 ? '...' : ''}`}</Text>
      </View>
      <View className="flex-row items-center gap-x-1 mb-4">
        <BaseIcon name="crosshairs-gps" />
        <Text className="text-darkGray text-lg">{`${destination.slice(0, 25)}${destination.length > 25 ? '...' : ''}`}</Text>
      </View>
      {userType === 'client' ? (
        <BaseButton title="Śledź kierowcę" />
      ) : (
        <>
          <BaseButton title="Rozpocznij" />
          <BaseButton alt title="Zobacz na mapie" />
        </>
      )}
    </View>
  )
}

export default RouteItem
