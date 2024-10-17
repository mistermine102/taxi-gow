import EmptyModal from './EmptyModal'
import { BaseButton, BaseTile, BaseTitle } from '../base/base'
import { View, Text } from 'react-native'
import Loader from '../Loader'
import Map from '../Map'

const AdminRoutePreview = ({ isVisible, onClose, onBtnPress, route, isLoading }) => {
  return (
    <EmptyModal isVisible={isVisible} onClose={onClose}>
      <View className="mt-8">
        <BaseTitle>Czy chcesz dodać trasę?</BaseTitle>
      </View>
      <View className="flex-1 mt-4 w-full p-4">
        {isLoading ? (
          <View className="h-[300px] items-center justify-center">
            <Loader size="large" />
          </View>
        ) : (
          <>
            {route ? (
              <View style={{ gap: 16 }}>
                <Map
                  rounded={true}
                  directions={{
                    origin: { latitude: route.clientOrigin.coords.latitude, longitude: route.clientOrigin.coords.longitude },
                    destination: { latitude: route.destination.coords.latitude, longitude: route.destination.coords.longitude },
                  }}
                ></Map>
                <BaseTile>
                  <View style={{ gap: 4 }}>
                    <View className="flex-row justify-between">
                      <Text className="text-lg font-semibold text-darkGray">Dystans</Text>
                      <Text className="text-lg font-bold text-darkGray">{route.distance} km</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-lg font-semibold text-darkGray">Przewidywany czas trwania</Text>
                      <Text className="text-lg font-bold text-darkGray">{route.duration} min</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-lg font-semibold text-darkGray">Koszt</Text>
                      <Text className="text-lg font-bold text-darkGray">{route.cost} zł</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-lg font-semibold text-darkGray">Kierowca</Text>
                      <Text className="text-lg font-bold text-darkGray">
                        {route.driver.name} ({route.driver.licensePlate})
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-lg font-semibold text-darkGray">Nr tel klienta</Text>
                      <Text className="text-lg font-bold text-darkGray">{route.clientPhoneNumber}</Text>
                    </View>
                  </View>
                </BaseTile>
              </View>
            ) : null}
          </>
        )}
      </View>
      <View className="flex-row w-full p-4" style={{ gap: 8 }}>
        <View className="flex-1">
          <BaseButton alt title="Zamknij" onPress={onClose} />
        </View>
        <View className="flex-1">
          <BaseButton title="Dodaj trasę" onPress={onBtnPress} />
        </View>
      </View>
    </EmptyModal>
  )
}
export default AdminRoutePreview
