import RouteCreateNavigator from './RouteCreate'
import AccountStack from './AccountStack'
import AdminNavigator from './Admin'
import AuthContext from '../context/Auth'
import { useContext } from 'react'
import TrackDriverScreen from '../screens/client/TrackDriver'
import DriverRoutesScreen from '../screens/driver/DriverRoutes'
import { BaseIcon } from '../components/base/base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../../colors'
import Toast from 'react-native-toast-message'

const Tab = createBottomTabNavigator()

const ACTIVE_TAB_COLOR = colors.activeTab
const INACTIVE_TAB_COLOR = colors.inActiveTab
const DISABLED_TAB_COLOR = colors.disabledTab

const MainTabNavigator = () => {
  const { user } = useContext(AuthContext)

  if (!user) return null

  const { activeRoute } = user

  return (
    <Tab.Navigator
      screenOptions={{
        // headerLeft: () => <Image source={logo} style={{ height: 48, width: 64, alignItems: 'center', justifyContent: 'center', marginLeft: 8 }} />,
        headerTitleStyle: { color: colors.darkGray },
        tabBarActiveTintColor: ACTIVE_TAB_COLOR,
        tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
      }}
      initialRouteName="RouteCreateStack"
    >
      {/* client screens */}
      {user.roles.includes('client') ? (
        <>
          <Tab.Screen
            options={{
              title: 'Śledź kierowcę',
              tabBarLabel: 'Śledź kierowcę',
              tabBarLabelStyle: { fontWeight: 'bold' },
              tabBarIcon: ({ focused }) => <BaseIcon name="map-marker-account" color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />,
            }}
            name="TrackDriver"
            component={TrackDriverScreen}
          />
          <Tab.Screen
            listeners={{
              tabPress: e => {
                if (activeRoute) {
                  e.preventDefault()
                  Toast.show({ type: 'error', text1: 'Zamówiłeś już kierowcę' })
                }
              },
            }}
            options={({ navigation }) => {
              //that's the only tab that can have 3 possible states (disabled, active, inactive)
              const isFocused = navigation.isFocused()

              return {
                headerShown: false,
                tabBarLabel: 'Zamów',
                tabBarLabelStyle: { fontWeight: 'bold', color: activeRoute ? DISABLED_TAB_COLOR : isFocused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR },
                tabBarIcon: () => (
                  <BaseIcon
                    name="human-greeting-variant"
                    color={activeRoute ? DISABLED_TAB_COLOR : isFocused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
                  />
                ),
              }
            }}
            name="RouteCreateStack"
            component={RouteCreateNavigator}
          />
        </>
      ) : null}
      {/* driver screens */}
      {user.roles.includes('driver') ? (
        <Tab.Screen
          options={{
            title: 'Trasy',
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarIcon: ({ focused }) => <BaseIcon name="map" color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />,
          }}
          name="DriverRoutes"
          component={DriverRoutesScreen}
        />
      ) : null}
      {/* admin screens */}
      {user.roles.includes('admin') ? (
        <Tab.Screen
          options={{
            headerShown: false,
            title: 'Admin',
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarIcon: ({ focused }) => <BaseIcon name="shield-account-variant" color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />,
          }}
          name="AdminStack"
          component={AdminNavigator}
        />
      ) : null}
      {/* shared screens */}
      <Tab.Screen
        options={{
          tabBarLabel: 'Konto',
          title: 'Konto',
          headerShown: false,
          tabBarActiveTintColor: ACTIVE_TAB_COLOR,
          tabBarInactiveTintColor: INACTIVE_TAB_COLOR,
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <BaseIcon name={user.roles.includes('admin') ? 'account-tie' : 'account'} color={focused ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR} />
          ),
        }}
        name="AccountStack"
        component={AccountStack}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
