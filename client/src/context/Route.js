import { createContext, useReducer } from 'react'
import haversine from '../utils/HaversineFormula'
import { SERVICED_AREA_CENTER, SERVICED_AREA_RADIUS } from '../../servicedArea'
import Toast from 'react-native-toast-message'

const Context = createContext()

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'set_client_origin':
      return {
        ...state,
        route: {
          ...state.route,
          clientOrigin: payload,
        },
      }
    case 'set_destination':
      return {
        ...state,
        route: {
          ...state.route,
          destination: payload,
        },
      }
    case 'set_driver':
      return {
        ...state,
        route: {
          ...state.route,
          driver: payload,
        },
      }
    case 'clear_route':
      return {
        ...state,
        route: {
          clientOrigin: null,
          driver: null,
          destination: null,
          duration: null,
          distance: null,
        },
      }
    case 'set_duration':
      return {
        ...state,
        route: {
          ...state.route,
          duration: payload,
        },
      }
    case 'set_distance':
      return {
        ...state,
        route: {
          ...state.route,
          distance: payload,
        },
      }
    default:
      return state
  }
}

export const Provider = ({ children }) => {
  const [{ route }, dispatch] = useReducer(reducer, {
    route: {
      clientOrigin: null,
      driver: null,
      destination: null,
      distance: null,
      duration: null,
    },
  })

  const validatePoint = point => {
    const { latitude: pointLatitude, longitude: pointLongitude } = point
    const { latitude: centerLatitude, longitude: centerLongitude } = SERVICED_AREA_CENTER

    const distanceFromCenter = haversine(pointLatitude, pointLongitude, centerLatitude, centerLongitude)

    if (distanceFromCenter * 1000 > SERVICED_AREA_RADIUS * 0.99) {
      Toast.show({ type: 'error', text1: 'Nieprawidłowy punkt', text2: 'Punkt znajduje się za daleko' })
      return false
    }
    return true
  }

  const setClientOrigin = origin => {
    if (!validatePoint(origin.coords)) return
    dispatch({ type: 'set_client_origin', payload: origin })
  }

  const selectDriver = driver => {
    dispatch({ type: 'set_driver', payload: driver })
  }

  const setDestination = destination => {
    if (!validatePoint(destination.coords)) return
    dispatch({ type: 'set_destination', payload: destination })
  }

  const clearRoute = () => {
    dispatch({ type: 'clear_route' })
  }

  const setDuration = duration => {
    dispatch({ type: 'set_duration', payload: duration })
  }

  const setDistance = distance => {
    dispatch({ type: 'set_distance', payload: distance })
  }

  return (
    <Context.Provider value={{ route, setClientOrigin, setDestination, selectDriver, clearRoute, setDuration, setDistance }}>
      {children}
    </Context.Provider>
  )
}

export default Context
