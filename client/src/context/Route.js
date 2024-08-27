import { createContext, useReducer } from 'react'

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
    },
  })

  const setClientOrigin = origin => {
    dispatch({ type: 'set_client_origin', payload: origin })
  }

  const selectDriver = driver => {
    dispatch({ type: 'set_driver', payload: driver })
  }

  const setDestination = destination => {
    dispatch({ type: 'set_destination', payload: destination })
  }

  return <Context.Provider value={{ route, setClientOrigin, setDestination, selectDriver }}>{children}</Context.Provider>
}

export default Context
