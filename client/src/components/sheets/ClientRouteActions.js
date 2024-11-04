import ActionSheet from 'react-native-actions-sheet'
import { Alert, View, Linking } from 'react-native'
import { BaseButton } from '../base/base'
import { SheetManager } from 'react-native-actions-sheet'

const ClientRouteOptions = ({ payload }) => {
  const cancelRoute = () => {
    SheetManager.hide('clientRouteOptions')
    Alert.alert('Anuluj przejazd', 'Aby anulować przejazd skontaktuj się z kierowcą', [
      { text: 'Wróć' },
      { text: 'Zadzwoń', onPress: () => Linking.openURL(`tel:${payload.driver.phoneNumber}`) },
    ])
  }

  return (
    <ActionSheet>
      <View className="p-4" style={{gap: 8}}>
        <BaseButton alt title='Zobacz kod' onPress={() => Alert.alert(payload.verificationCode)} />
        <BaseButton title="Anuluj przejazd" onPress={cancelRoute} />
      </View>
    </ActionSheet>
  )
}

export default ClientRouteOptions
