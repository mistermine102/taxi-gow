import EmptyModal from './EmptyModal'
import { View, StyleSheet, Text } from 'react-native'
import { BaseButton } from '../base/base'
import Map from '../Map'

const MapModal = ({
  children,
  isVisible = false,
  onBtnPress = () => {},
  btnCaption,
  title = 'Modal',
  onClose = () => {},
  markers = [],
  directions = {},
  region = {},
}) => {
  return (
    <EmptyModal isVisible={isVisible} onClose={onClose}>
      <View className="p-4">
        <Text className="text-xl font-semibold">{title}</Text>
      </View>
      <View className="flex-1 w-full">
        <Map region={region} markers={markers} directions={directions} height="100%">
          {children}
        </Map>
      </View>
      <View className="w-full p-4">
        <BaseButton title={btnCaption} onPress={onBtnPress} />
      </View>
    </EmptyModal>
  )
}

export default MapModal
