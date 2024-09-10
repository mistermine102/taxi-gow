import { Modal, View } from 'react-native'

const EmptyModal = ({ children, isVisible, onClose }) => {
  if (!isVisible) return null

  return (
    <View className="flex-1 mt-8">
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
        <View className="flex-1 mt-8">{children}</View>
      </Modal>
    </View>
  )
}

export default EmptyModal
