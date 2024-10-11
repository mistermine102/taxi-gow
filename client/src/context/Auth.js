import { createContext, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import appApi from '../api/appApi'
import { navigate } from '../RootNavigation'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import socket from '../socket'

const Context = createContext()

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'set_user':
      return { ...state, user: payload }
    case 'update_route_status':
      return {
        ...state,
        user: {
          ...state.user,
          activeRoute: { ...state.user.activeRoute, status: payload },
        },
      }
    case 'update_active_route':
      return { ...state, user: { ...state.user, activeRoute: payload } }
    default:
      return state
  }
}

export const Provider = ({ children }) => {
  const [{ user }, dispatch] = useReducer(reducer, {
    user: null,
  })

  const signin = async ({ email, password }) => {
    try {
      const response = await appApi.post('/signin', {
        email,
        password,
      })

      //authenticate web socket connection
      socket.emit('authenticate', response.data.token)

      //store token in async storage
      await AsyncStorage.setItem('token', response.data.token)

      //store user info in context
      dispatch({ type: 'set_user', payload: response.data.user })

      //navigate to mainTab
      navigate('MainTab')
    } catch (err) {
      throw err
    }
  }

  const signup = async ({ email, password, phoneNumber }) => {
    try {
      //validate
      const isEmailValid = validateEmail(email)
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber)

      if (!isEmailValid) throw new Error('INVALID_EMAIL')
      if (!parsedPhoneNumber || !parsedPhoneNumber.isValid())
        throw new Error('INVALID_PHONE')
      if (password.length < 6) throw new Error('INVALID_PASSWORD')

      const response = await appApi.post('/signup', {
        email,
        password,
        phoneNumber,
      })

      //authenticate web socket connection
      socket.emit('authenticate', response.data.token)

      //store token in async storage
      await AsyncStorage.setItem('token', response.data.token)

      //store user info in context
      dispatch({ type: 'set_user', payload: response.data.user })

      //navigate to mainTab
      navigate('MainTab')
    } catch (err) {
      throw err
    }
  }

  const tryLocalSignin = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) return navigate('AuthStack')

      const response = await appApi.get('/user')

      //authenticate web socket connection
      socket.emit('authenticate', token)

      dispatch({ type: 'set_user', payload: response.data.user })

      navigate('MainTab')
    } catch (err) {
      //handle error
      console.log('cannot sign in')
      console.log(err.response)

      if (err.response && err.response.status === 401) {
        await AsyncStorage.removeItem('token')
        navigate('AuthStack')
      }
    }
  }

  const signout = async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'set_user', payload: null })
    navigate('AuthStack')
  }

  const updateRouteStatus = (newStatus) => {
    dispatch({ type: 'update_route_status', payload: newStatus })
  }

  const updateActiveRoute = (newRoute) => {
    dispatch({ type: 'update_active_route', payload: newRoute })
  }

  return (
    <Context.Provider
      value={{
        signin,
        signup,
        signout,
        tryLocalSignin,
        user,
        updateRouteStatus,
        updateActiveRoute,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
