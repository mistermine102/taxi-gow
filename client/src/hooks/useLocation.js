import { useEffect, useState } from 'react'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, Accuracy } from 'expo-location'

export default () => {
  const [currentLocation, setCurrentLocation] = useState()
  const [locationPermissionError, setLocationPermissionErrorMsg] = useState()

  const getCurrentLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setLocationPermissionErrorMsg('Brak dostępu do lokalizacji')
      return
    }

    let loc = await getCurrentPositionAsync({ accuracy: Accuracy.Lowest })
    setCurrentLocation(loc)
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return {
    currentLocation,
    getCurrentLocation,
    locationPermissionError,
  }
}
