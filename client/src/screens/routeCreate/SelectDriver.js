import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import appApi from '../../api/appApi'
import { useEffect, useContext, useState } from 'react'
import RouteContext from '../../context/Route'
import DriverItem from '../../components/DriverItem'
import { ScreenWrapper, BaseButton, BaseTitle } from '../../components/base/base'

const SelectDriver = ({ navigation }) => {
  const { route, selectDriver } = useContext(RouteContext)
  const [drivers, setDrivers] = useState([])
  const { clientOrigin, destination } = route

  useEffect(() => {
    const getDrivers = async () => {
      const response = await appApi.get('/drivers', {
        params: {
          origin: `${clientOrigin.coords.latitude},${clientOrigin.coords.longitude}`,
          destination: `${destination.coords.latitude}, ${destination.coords.longitude}`,
        },
      })
      setDrivers(response.data.drivers)

      //set route's duration and distance
    }
    getDrivers()
  }, [])

  return (
    <ScreenWrapper>
      <View className="mt-16">
        <BaseTitle>Wybierz kierowcę</BaseTitle>
      </View>
      <View className="my-4 flex-1">
        <FlatList
          contentContainerStyle={{ gap: 16 }}
          data={drivers}
          keyExtractor={d => d._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectDriver(item)}>
              <DriverItem driver={item} isSelected={route.driver ? route.driver._id === item._id : false} />
            </TouchableOpacity>
          )}
        />
      </View>
      {route.driver ? <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('Summary')} /> : null}
    </ScreenWrapper>
  )
}
export default SelectDriver
