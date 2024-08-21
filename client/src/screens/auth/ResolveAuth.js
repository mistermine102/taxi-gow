import { useEffect, useContext } from 'react'
import AuthContext from '../../context/Auth'

const ResolveAuth = () => {
  const { tryLocalSignin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalSignin()
  }, [])

  return null
}

export default ResolveAuth
