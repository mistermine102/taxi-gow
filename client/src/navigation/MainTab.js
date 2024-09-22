import RouteCreateNavigator from '../navigation/RouteCreate'
import AuthContext from '../context/Auth'
import { useContext } from 'react'
import TrackDriverScreen from '../screens/client/TrackDriver'
import DriverRoutesScreen from '../screens/driver/DriverRoutes'
import AccountScreen from '../screens/Account'
import { Image } from 'react-native'
import { logo } from '../images/index'
import { BaseIcon } from '../components/base/base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../../colors'

const Tab = createBottomTabNavigator()

const ACTIVE_TAB_COLOR = colors.activeTab
const INACTIVE_TAB_COLOR = colors.inActiveTab

const MainTabNavigator = () => {
  const { user } = useContext(AuthContext)

  if (!user) return null

  return (
    <Tab.Navigator
      screenOptions={{
        // headerLeft: () => <Image source={logo} style={{ height: 48, width: 64, alignItems: 'center', justifyContent: 'center', marginLeft: 8 }} />,
        headerTitleStyle: { color: colors.darkGray },
      }}
      initialRouteName="RouteCreateStack"
    >
      {user.role === 'client' ? (
        <>
          <Tab.Screen
            options={{
              title: 'Śledź kierowcę',
              tabBarLabel: 'Śledź kierowcę',
              tabBarActiveTintColor: ACTIVE_TAB_COLOR,
              tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
              tabBarLabelStyle: { fontWeight: 'bold' },
              tabBarIcon: ({ focused }) => <BaseIcon name="map-marker-account" color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />,
            }}
            name="TrackDriver"
            component={TrackDriverScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabel: 'Zamów',
              tabBarActiveTintColor: ACTIVE_TAB_COLOR,
              tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
              tabBarLabelStyle: { fontWeight: 'bold' },
              tabBarIcon: ({ focused }) => <BaseIcon name="human-greeting-variant" color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />,
            }}
            name="RouteCreateStack"
            component={RouteCreateNavigator}
          />
        </>
      ) : (
        <Tab.Screen name="DriverRoutes" component={DriverRoutesScreen} />
      )}
      <Tab.Screen
        options={{
          tabBarLabel: 'Konto',
          title: 'Konto',
          tabBarActiveTintColor: ACTIVE_TAB_COLOR,
          tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => <BaseIcon name="account" color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />,
        }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
