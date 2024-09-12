import '../_mockLocation'
import { Text } from 'react-native'
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location'
import { useEffect } from 'react'
import appApi from '../api/appApi'

const LocationExample = () => {
  useEffect(() => {
    ;(async () => {
      let { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Request denied')
        return
      }
      console.log('Permission granted')
      watchPositionAsync({ accuracy: Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 10 }, location => {
        console.log('Getting location', location)
      })
    })()
  }, [])
  return <Text>Location Example</Text>
}

export default LocationExample
