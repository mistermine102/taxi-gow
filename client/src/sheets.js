import { registerSheet } from 'react-native-actions-sheet'
import ClientRouteOptions from './components/sheets/ClientRouteActions'
import DriverRouteOptions from './components/sheets/DriverRouteOptions'

registerSheet('clientRouteOptions', ClientRouteOptions)
registerSheet('driverRouteOptions', DriverRouteOptions)

export {}
