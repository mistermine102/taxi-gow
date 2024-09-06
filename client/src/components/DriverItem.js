import { View, Text } from 'react-native'
import { BaseIcon } from './base/base'

const driverItem = ({ driver, isSelected = false }) => {
  return (
    <View className={isSelected ? 'bg-primary p-2 rounded-md' : 'bg-lightGray p-2 rounded-md'}>
      <View className="flex-row justify-between">
        {/* <Text className="text-darkGray text-lg font-bold mb-1">{driver._id.slice(0, 15)}...</Text> */}
        <Text className="text-darkGray text-lg font-bold mb-1">{driver._id.slice(15)}</Text>
        <View className="flex-row items-center gap-1">
          <BaseIcon name="cash" size={28} />
          <Text className="text-darkGray text-lg font-semibold">{driver.cost.total.toFixed(2)} zł</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-1">
        <BaseIcon name="car-side" />
        <Text className="text-darkGray text-[16px]">Seat Ibiza</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <BaseIcon name="clock-time-four-outline" />
        <Text className="text-darkGray text-[16px]">{driver.duration.text}</Text>
      </View>
    </View>
  )
}

export default driverItem
