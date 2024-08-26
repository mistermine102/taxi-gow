import { useState, useEffect } from 'react'
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
    let location = await getCurrentPositionAsync({ accuracy: Accuracy.Lowest })
    setLocation(location)
  }

  return {
    location,
    getCurrentLocation,
    errorMsg
  }
}
