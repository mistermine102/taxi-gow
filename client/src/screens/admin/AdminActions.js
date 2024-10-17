import { ScreenWrapper, BaseTitle } from '../../components/base/base'
import PressableTile from '../../components/PressableTile'
import { View } from 'react-native'

const AdminActions = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Akcje Admina</BaseTitle>
      </View>
      <View className="mt-2" style={{gap: 16}}>
        <PressableTile title="Utwórz trasę" onPress={() => navigation.navigate('ManualRouteCreate')} />
        <PressableTile title="Zobacz wszystkie trasy" onPress={() => navigation.navigate('AllRoutes')} />
      </View>
    </ScreenWrapper>
  )
}

export default AdminActions
