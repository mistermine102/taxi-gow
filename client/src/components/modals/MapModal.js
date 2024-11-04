import EmptyModal from './EmptyModal'
import { View, Text } from 'react-native'
import { BaseButton } from '../base/base'
import Map from '../Map'
import Loader from '../Loader'

const MapModal = ({
  children,
  isVisible = false,
  isLoading = false,
  onBtnPress = () => {},
  btnCaption,
  title = 'Modal',
  onClose = () => {},
  markers = [],
  directions = {},
  region = {},
  onRegionChange = () => {},
}) => {
  return (
    <EmptyModal isVisible={isVisible} onClose={onClose}>
      <View className="p-4">
        <Text className="text-xl font-semibold">{title}</Text>
      </View>
      <View className="flex-1 w-full relative">
        <Map onRegionChange={onRegionChange} region={region} markers={markers} directions={directions} height="100%">
          {children}
        </Map>
        {isLoading ? (
          <View pointerEvents="none" className="absolute bg-black opacity-50 w-full h-full items-center justify-center">
            <Loader size="large" />
          </View>
        ) : null}
      </View>
      <View className="w-full p-4">
        <BaseButton title={btnCaption} onPress={onBtnPress} />
      </View>
    </EmptyModal>
  )
}

export default MapModal
