import { useEffect, useContext } from 'react'
import AuthContext from '../../context/Auth'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ResolveAuth = () => {
  const isFocused = useIsFocused()
  const { tryLocalSignin } = useContext(AuthContext)

  // AsyncStorage.removeItem('token')
  // console.log("token removed")

  useEffect(() => {
    if (!isFocused) return
    tryLocalSignin()
  }, [isFocused])

  return null
}

export default ResolveAuth
