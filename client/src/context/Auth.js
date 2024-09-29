import { createContext, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import appApi from '../api/appApi'
import { navigate } from '../RootNavigation'
import { ActivityIndicator } from 'react-native'

const Context = createContext()

const validateEmail = email => {
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

      //store token in async storage
      await AsyncStorage.setItem('token', response.data.token)

      //store user info in context
      dispatch({ type: 'set_user', payload: response.data.user })

      //navigate to mainTab
      navigate('MainTab')
    } catch (err) {
      //invalid email or password
      //ideally show an alert
      //TODO
      console.log(err.response.data)
    }
  }

  const signup = async ({ email, password }) => {
    try {
      //validate
      const isEmailValid = validateEmail(email)
      if (!isEmailValid) throw new Error('Invalid email')
      if (password.length < 6) throw new Error('Password must be at least 6 characters long')

      const response = await appApi.post('/signup', {
        email,
        password,
      })
      //store token in async storage
      await AsyncStorage.setItem('token', response.data.token)

      //store user info in context
      dispatch({ type: 'set_user', payload: response.data.user })

      //navigate to mainTab
      navigate('MainTab')
    } catch (err) {
      //invalid email or password
      //ideally show an alert
      //TODO
      console.log(err)
    }
  }

  const tryLocalSignin = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) return navigate('AuthStack')

      const response = await appApi.get('/user')
      dispatch({ type: 'set_user', payload: response.data.user })

      navigate('MainTab')
    } catch (err) {
      //handle error
      console.log('cannot sign in')
      console.log(err)
    }
  }

  const signout = async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'set_user', payload: null })
    navigate('AuthStack')
  }

  return <Context.Provider value={{ signin, signup, signout, tryLocalSignin, user }}>{children}</Context.Provider>
}

export default Context
