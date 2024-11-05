import { FlatList, View } from 'react-native'
import { BaseTitle, ScreenWrapper } from '../../components/base/base'
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import appApi from '../../api/appApi'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import RouteItem from '../../components/RouteItem'
import moment from 'moment/moment'
import EmptyState from '../../components/EmptyState'
import Loader from '../../components/Loader'

const PreviousRoutesScreen = () => {
  const isFocused = useIsFocused()
  const getRoutes = useAsyncRequest()
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    if (!isFocused) return

    getRoutes.send(async () => {
      const response = await appApi.get('/users/routes')
      setRoutes(response.data.routes)
    })
  }, [isFocused])

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Historia przejazdów</BaseTitle>
      </View>

      {getRoutes.isLoading ? (
        <View className="mt-8">
          <Loader size="large" />
        </View>
      ) : routes.length === 0 ? (
        <View className="mt-8">
          <EmptyState />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ gap: 16 }}
          data={routes}
          keyExtractor={item => item._id}
          renderItem={({ item: route }) => (
            <RouteItem
              additionalRows={[{ text: `${route.totalCost} zł`, icon: 'cash' }]}
              name={moment(route.meta.createdAt).format('DD.MM.YYYY')}
              status={route.status}
              origin={route.clientOrigin.address}
              destination={route.destination.address}
            />
          )}
        />
      )}
    </ScreenWrapper>
  )
}

export default PreviousRoutesScreen
