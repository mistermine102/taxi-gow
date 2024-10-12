import { BaseLink, ScreenWrapper } from "../../components/base/base"

const AdminActions = ({navigation}) => {
  return (
    <ScreenWrapper>
      <BaseLink title="Stwórz trasę" onPress={() => navigation.navigate('ManualRouteCreate')} />
      <BaseLink title="Zobacz wszystkie trasy" onPress={() => navigation.navigate('AllRoutes')} />
    </ScreenWrapper>
  ) 
}

export default AdminActions
