import ActionSheet from 'react-native-actions-sheet'
import { Alert, View } from 'react-native'
import { BaseButton } from '../base/base'
import { SheetManager } from 'react-native-actions-sheet'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import appApi from '../../api/appApi'
import Toast from 'react-native-toast-message'

const DriverRouteOptions = ({ payload }) => {
  const cancelRoute = useAsyncRequest()

  const showConfirmAlert = () => {
    SheetManager.hide('driverRouteOptions')
    Alert.alert('Anuluj przejazd', 'Czy na pewno chcesz anulować przejazd?', [
      { text: 'Wróć' },
      { text: 'Anuluj przejazd', onPress: handleRouteCancel },
    ])
  }

  const handleRouteCancel = () => {
    cancelRoute.send(async () => {
      await appApi.patch(`/routes/${payload.routeId}`, {
        newStatusId: 100,
      })
      Toast.show({ type: 'success', text1: 'Anulowano trasę', text2: 'Pomyślnie anulowano trasę' })
    })
  }

  return (
    <ActionSheet>
      <View className="p-4" style={{ gap: 8 }}>
        <BaseButton alt title="Zobacz kod" onPress={() => Alert.alert(payload.verificationCode)} />
        <BaseButton title="Anuluj przejazd" onPress={showConfirmAlert} />
      </View>
    </ActionSheet>
  )
}

export default DriverRouteOptions
