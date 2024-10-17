import { FlatList, View } from 'react-native'
import { BaseIcon, BaseTitle, ScreenWrapper } from '../../components/base/base'
import { useContext, useEffect, useState } from 'react'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import appApi from '../../api/appApi'
import RouteItem from '../../components/RouteItem'
import { BaseButton } from '../../components/base/base'
import MapModal from '../../components/modals/MapModal'
import { Marker } from 'react-native-maps'
import AuthContext from '../../context/Auth'
import { useIsFocused } from '@react-navigation/native'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

const AllRoutes = () => {
  const getAllRoutes = useAsyncRequest()
  const getDriverLocation = useAsyncRequest()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [driverLocation, setDriverLocation] = useState()
  const [directions, setDirections] = useState()
  const { allRoutes: routes, updateAllRoutes } = useContext(AuthContext)
  const isFocused = useIsFocused()

  const openModal = route => {
    getDriverLocation.send(async () => {
      setDriverLocation(null)
      const { latitude: originLatitude, longitude: originLongitude } = route.clientOrigin
      const { latitude: destinationLatitude, longitude: destinationLongitude } = route.destination

      setDirections({
        origin: {
          latitude: originLatitude,
          longitude: originLongitude,
        },
        destination: {
          latitude: destinationLatitude,
          longitude: destinationLongitude,
        },
      })
      setIsModalVisible(true)
      const response = await appApi.get(`/drivers/location?driverId=${route.driver._id}`)
      setDriverLocation(response.data.location)
    })
  }

  useEffect(() => {
    if (!isFocused) return
    getAllRoutes.send(async () => {
      const response = await appApi.get('/routes')
      updateAllRoutes(response.data.routes)
    })
  }, [isFocused])
  return (
    <ScreenWrapper>
      <MapModal
        isVisible={isModalVisible}
        onBtnPress={() => setIsModalVisible(false)}
        btnCaption="Wróć"
        title="Zobacz trasę"
        onClose={() => setIsModalVisible(false)}
        markers={
          driverLocation
            ? [
                <Marker key="driverLocation" identifier="driverLocation" coordinate={driverLocation}>
                  <BaseIcon name="taxi" size={32} color="yellow" />
                </Marker>,
              ]
            : []
        }
        directions={directions}
        region={
          driverLocation
            ? { latitude: driverLocation.latitude, longitude: driverLocation.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }
            : null
        }
      />
      <View className="mt-16">
        <BaseTitle>Wszystkie trasy</BaseTitle>
      </View>
      {getAllRoutes.isLoading ? (
        <View className="h-[300px] items-center justify-center">
          <Loader />
        </View>
      ) : (
        <>
          {routes.length ? (
            <FlatList
              data={routes}
              keyExtractor={route => route._id}
              contentContainerStyle={{ gap: 16, marginTop: 16 }}
              renderItem={({ item: route }) => (
                <RouteItem
                  name={route._id}
                  status={route.status}
                  destination={route.destination.address}
                  origin={route.clientOrigin.address}
                  additionalRows={[
                    {
                      icon: 'taxi',
                      text: `${route.driver.name} (${route.driver.licensePlate})`,
                    },
                    {
                      icon: 'account',
                      text: route.client.phoneNumber,
                    },
                  ]}
                >
                  <BaseButton title="Zobacz na mapie" onPress={() => openModal(route)} />
                </RouteItem>
              )}
            />
          ) : (
            <View className="h-[300px] items-center justify-center">
              <EmptyState />
            </View>
          )}
        </>
      )}
    </ScreenWrapper>
  )
}

export default AllRoutes
