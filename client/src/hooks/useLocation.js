import { useEffect, useState } from 'react'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, Accuracy } from 'expo-location'

export default () => {
  const [location, setLocation] = useState()
  const [errorMsg, setErrorMsg] = useState()

  const getCurrentLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let loc = await getCurrentPositionAsync({ accuracy: Accuracy.Lowest })
    setLocation(loc)
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return {
    location,
    errorMsg,
  }
}
