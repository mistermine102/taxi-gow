import { smallShadow } from '../../../shadow'
import EmptyModal from '../../components/modals/EmptyModal'
import Loader from '../../components/Loader'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import { BaseTitle, BaseButton, BaseIcon } from '../../components/base/base'

const AdminSelectDriver = ({ isVisible, onClose, onBtnPress, allDrivers, isLoading, selectedDriver, selectDriver }) => {
  return (
    <EmptyModal isVisible={isVisible} onClose={onClose}>
      <View className="mt-8">
        <BaseTitle>Wybierz kierowcę</BaseTitle>
      </View>
      <View className="flex-1 w-full p-4">
        {isLoading ? (
          <View className="h-[300px] items-center justify-center">
            <Loader size='large'/>
          </View>
        ) : (
          <FlatList
            data={allDrivers}
            keyExtractor={driver => driver._id}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item: driver }) => (
              <TouchableOpacity onPress={() => selectDriver(driver)}>
                <View
                  className={`p-4 rounded-md ${
                    selectedDriver._id === driver._id ? 'bg-primary' : driver.isAvailable ? 'bg-lightGray' : ' bg-lightGray opacity-50'
                  }`}
                  style={smallShadow}
                >
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-lg text-darkGray font-bold">{driver.name}</Text>
                      <View className="ml-2 bg-white px-4 py-2 rounded-sm border">
                        <Text className="font-bold text-darkGray">{driver.licensePlate}</Text>
                      </View>
                    </View>
                    <View>
                      <View className={`px-2 py-1 rounded-full ${driver.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
                        <Text className="font-semibold text-white">{driver.isAvailable ? 'Dostępny' : 'Niedostępny'}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <BaseIcon name="phone" />
                    <Text className="text-lg text-darkGray ml-2">{driver.phoneNumber}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View className="w-full p-4">
        <BaseButton title="Kontynuuj" onPress={onBtnPress} />
      </View>
    </EmptyModal>
  )
}

export default AdminSelectDriver
