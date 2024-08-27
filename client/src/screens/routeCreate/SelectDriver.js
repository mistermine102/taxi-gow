import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import appApi from '../../api/appApi'
import { useEffect, useContext, useState } from 'react'
import RouteContext from '../../context/Route'
import DriverItem from '../../components/DriverItem'
import BaseButton from '../../components/base/BaseButton'

const SelectDriver = ({navigation}) => {
  const { route, selectDriver } = useContext(RouteContext)
  const [drivers, setDrivers] = useState([])
  const { clientOrigin } = route
  const { latitude, longitude } = clientOrigin.coords

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
            <TouchableOpacity onPress={() => selectDriver(item)}>
              <DriverItem driver={item} isSelected={route.driver ? route.driver._id === item._id : false } />
            </TouchableOpacity>
          )}
        />
      </View> 
      { route.driver ? <BaseButton title='Kontynuuj' onPress={() => navigation.navigate('Summary')}/> : null }
    </View>
  )
}
export default SelectDriver
