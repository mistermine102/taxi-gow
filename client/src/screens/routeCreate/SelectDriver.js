import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import appApi from '../../api/appApi'
import { useEffect, useContext, useState } from 'react'
import RouteContext from '../../context/Route'
import DriverItem from '../../components/DriverItem'
import BaseButton from '../../components/base/BaseButton'

const SelectDriver = () => {
  const { route } = useContext(RouteContext)
  const [drivers, setDrivers] = useState([])
  const { clientOrigin } = route
  const { latitude, longitude } = clientOrigin
  const [selectedDriver, setSelectedDriver] = useState()

  useEffect(() => {
    const getDrivers = async () => {
      const response = await appApi.get('/drivers', {
        params: {
          latitude,
          longitude,
        },
      })
      setDrivers(response.data.drivers)
    }
    getDrivers()
  }, [])

  return (
    <View className="flex-1 bg-white px-base">
      <Text className="text-2xl text-darkGray font-semibold text-center mt-16">Wybierz kierowcę</Text>
      <View className="my-4 flex-1">
        <FlatList
          contentContainerStyle={{ gap: 16 }}
          data={drivers}
          keyExtractor={d => d._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedDriver(item)}>
              <DriverItem driver={item} isSelected={selectedDriver ? selectedDriver._id === item._id : false } />
            </TouchableOpacity>
          )}
        />
      </View>
      <BaseButton title='Kontynuuj'/>
    </View>
  )
}
export default SelectDriver
