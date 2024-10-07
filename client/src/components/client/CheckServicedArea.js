import { useRef, useState } from 'react'
import { BaseLink } from '../base/base'
import MapModal from '../modals/MapModal'
import { View } from 'react-native'
import { SERVICED_AREA_CENTER, SERVICED_AREA_RADIUS } from '../../../servicedArea'
import MapView, { Circle } from 'react-native-maps'
import colors from '../../../colors'

const CheckServicedArea = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <MapModal
        isVisible={isModalVisible}
        onBtnPress={() => setIsModalVisible(false)}
        btnCaption="Wróć"
        title="Obsługiwany obszar"
        onClose={() => setIsModalVisible(false)}
        region={{ latitude: SERVICED_AREA_CENTER.latitude, longitude: SERVICED_AREA_CENTER.longitude, latitudeDelta: 1, longitudeDelta: 1 }}
      >
        <Circle strokeColor={colors.primary} fillColor="rgba(255,255,255,0.25)" radius={SERVICED_AREA_RADIUS - 300} center={SERVICED_AREA_CENTER} />
      </MapModal>
      <View className="mt-2">
        <BaseLink onPress={() => setIsModalVisible(true)} title="Zobacz obsługiwany obszar" />
      </View>
    </>
  )
}

export default CheckServicedArea
