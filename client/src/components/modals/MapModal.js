import EmptyModal from './EmptyModal'
import { View, StyleSheet, Text } from 'react-native'
import { BaseButton } from '../base/base'
import Map from '../Map'

const MapModal = ({
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
      <View style={styles.modalView} className="bg-white mx-2 my-8 flex-1 rounded-3xl items-center">
        <View className="p-4">
          <Text className="text-xl font-semibold">{title}</Text>
        </View>
        <View className="flex-1 w-full">
          <Map region={region} markers={markers} directions={directions} height="100%" />
        </View>
        <View className="w-full p-4">
          <BaseButton title={btnCaption} onPress={onBtnPress} />
        </View>
      </View>
    </EmptyModal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    //shadow styles
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default MapModal
