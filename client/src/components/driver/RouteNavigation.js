import { Linking } from 'react-native'
import { BaseLink } from '../base/base'

const RouteNavigation = ({ clientOrigin, destination }) => {
  const openRouteNavigation = () => {
    const baseUrl = 'https://www.google.com/maps/dir/?api=1'
    const driverOriginUrl = `origin=My+Location`
    const clientOriginUrl = `waypoints=${clientOrigin.latitude},${clientOrigin.longitude}`
    const destinationUrl = `destination=${destination.latitude},${destination.longitude}`

    Linking.openURL(`${baseUrl}&${driverOriginUrl}&${clientOriginUrl}&${destinationUrl}&dir_action=navigate`)
  }

  return <BaseLink onPress={openRouteNavigation} title="Nawigacja" />
}

export default RouteNavigation
