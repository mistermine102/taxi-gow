import { useEffect, useContext } from 'react'
import AuthContext from '../../context/Auth'
import TMExample from '../../components/__TMExample'

const ResolveAuth = () => {
  // const { tryLocalSignin } = useContext(AuthContext)

  // useEffect(() => {
  //   tryLocalSignin()
  // }, [])

  // return null

  return <TMExample/>
}

export default ResolveAuth
