import { FlatList, TouchableOpacity, View } from 'react-native'
import appApi from '../../../api/appApi'
import { useEffect, useContext, useState } from 'react'
import RouteContext from '../../../context/Route'
import DriverItem from '../../../components/client/DriverItem'
import { ScreenWrapper, BaseButton, BaseTitle, BaseIcon } from '../../../components/base/base'
import useAsyncRequest from '../../../hooks/useAsyncRequest'
import Loader from '../../../components/Loader'
import colors from '../../../../colors'
import { useIsFocused } from '@react-navigation/native'

const SelectDriver = ({ navigation }) => {
  const { route, selectDriver, setDuration, setDistance, setClientOrigin, setDestination } = useContext(RouteContext)
  const isFocused = useIsFocused()
  const [drivers, setDrivers] = useState([])
  const getDrivers = useAsyncRequest()
  const { clientOrigin, destination } = route

  console.log(isFocused)

  useEffect(() => {
    if (isFocused) {
      //when entering the screen
      selectDriver(null)
      getDrivers.send(async () => {
        const response = await appApi.get('/drivers', {
          params: {
            origin: `${clientOrigin.coords.latitude},${clientOrigin.coords.longitude}`,
            destination: `${destination.coords.latitude}, ${destination.coords.longitude}`,
          },
        })
        setClientOrigin({ ...route.clientOrigin, address: response.data.route.clientOriginAddress })
        setDestination({ ...route.destination, address: response.data.route.destinationAddress })
        setDistance(response.data.route.distance)
        setDuration(response.data.route.duration)
        setDrivers(response.data.drivers)
      })
    }
  }, [isFocused])

  return (
    <ScreenWrapper>
      <View className="mt-16">
        <BaseTitle>Wybierz kierowcę</BaseTitle>
      </View>
      {getDrivers.isLoading ? (
        <View className="h-[200px] w-full justify-center items-center">
          <Loader size="small" />
        </View>
      ) : drivers.length === 0 ? (
        <View className="justify-center items-center mt-8">
          <BaseIcon name="car-off" size={128} color={colors.lightGray} />
          <BaseTitle>Obecnie żaden kierowca nie jest dostępny, przepraszamy</BaseTitle>
        </View>
      ) : (
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
      )}

      {route.driver ? (
        <View className="mb-4">
          <BaseButton title="Kontynuuj" onPress={() => navigation.navigate('Summary')} />
        </View>
      ) : null}
    </ScreenWrapper>
  )
}
export default SelectDriver
