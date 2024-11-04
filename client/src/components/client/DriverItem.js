import { View, Text } from 'react-native'
import { BaseIcon } from '../base/base'
import { smallShadow } from '../../../shadow'

const driverItem = ({ driver, isSelected = false }) => {
  return (
    <View style={smallShadow} className={isSelected ? 'bg-primary px-2 py-4 rounded-md' : 'bg-lightGray px-2 py-4 rounded-md'}>
      <View className="flex-row">
        <View className=" flex-1 justify-center items-center">
        <BaseIcon name="account" size={28} />
        <Text className="text-[16px] font-semibold text-darkGray">{driver.name}</Text>
        </View>
        <View className="items-center flex-1 justify-center">
          <BaseIcon name="cash" size={28} />
          <Text className="text-[16px] font-semibold text-darkGray">{driver.cost.total.toFixed(2)} zł</Text>
        </View>
        <View className="items-center flex-1 justify-center">
          <BaseIcon name="clock-time-four-outline" size={28} />
          <Text className="text-[16px] font-semibold text-darkGray">{driver.waitTime} min</Text>
        </View>
      </View>
    </View>
  )
}

export default driverItem
