import EmptyModal from './EmptyModal'
import { BaseButton, BaseTile, BaseTitle, BaseLabel } from '../base/base'
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
                    <BaseLabel label="Dystans" value={`${route.distance} km`} />
                    <BaseLabel label="Przewidywany czas" value={`${route.duration} min`} />
                    <BaseLabel label="Koszt" value={`${route.cost} zł`} />
                    <BaseLabel label="Kierowca" value={`${route.driver.name} (${route.driver.licensePlate})`} />
                    <BaseLabel label="Nr tel klienta" value={route.clientPhoneNumber} />
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
