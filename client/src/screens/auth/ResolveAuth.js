import { useEffect, useContext } from 'react'
import AuthContext from '../../context/Auth'
import { useIsFocused } from '@react-navigation/native'

const ResolveAuth = () => {
  const isFocused = useIsFocused()
  const { tryLocalSignin } = useContext(AuthContext)

  useEffect(() => {
    if (!isFocused) return
    tryLocalSignin()
  }, [isFocused])

  return null
}

export default ResolveAuth
