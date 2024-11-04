import { Modal, View, StyleSheet } from 'react-native'

const EmptyModal = ({ children, isVisible, onClose }) => {
  if (!isVisible) return null

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
        <View className="flex-1 mt-8">
          <View style={styles.modalView} className="bg-white mx-2 my-8 flex-1 rounded-3xl items-center">
            {children}
          </View>
        </View>
      </Modal>
    </View>
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

export default EmptyModal
