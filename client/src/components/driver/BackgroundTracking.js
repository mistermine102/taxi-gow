import { Text, View } from 'react-native'
import { BaseButton } from '../base/base'
import { useContext, useEffect, useState } from 'react'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import appApi from '../../api/appApi'
import AuthContext from '../../context/Auth'
import { LOCATION_TASK_NAME } from '../../constants'

const BackgroundTracking = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const checkForBgLocation = async () => {
      try {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)

        if (hasStarted) {
          setIsEnabled(true)
        } else {
          setIsEnabled(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
    checkForBgLocation()
  }, [])

  const handleButtonPress = async () => {
    try {
      if (!isEnabled) {
        //enable
        await requestPermissions()
        await enableBackgroundTracking()
        setIsEnabled(true)
      } else {
        //disable
        await disableBackgroundTracking()
        setIsEnabled(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const requestPermissions = async () => {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
      if (foregroundStatus !== 'granted') return

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
      if (backgroundStatus !== 'granted') return
    } catch (err) {
      console.log(err)
    }
  }

  const disableBackgroundTracking = async () => {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
    } catch (err) {
      throw err
    }
  }

  const enableBackgroundTracking = async () => {
    try {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
        distanceInterval: 1,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: 'Using your location',
          notificationBody: 'To turn off, go back to the app and switch something off.',
        },
      })
      console.log('Task connected')
    } catch (err) {
      throw err
    }
  }

  return (
    <View className="mt-2">
      <Text className="text-darkGray font-bold mb-2">Śledzenie lokalizacji w tle {isEnabled ? 'włączone' : 'wyłączone'}</Text>
      <BaseButton alt={isEnabled} title={isEnabled ? 'Wyłącz' : 'Włącz'} onPress={handleButtonPress} />
    </View>
  )
}

const updateLocation = async location => {
  const { latitude, longitude, altitude, accuracy, heading, speed } = location.coords

  await appApi.patch('/users/location', {
    location: {
      timestamp: location.timestamp,
      coords: {
        latitude,
        longitude,
        altitude,
        accuracy,
        heading,
        speed,
      },
    },
  })
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  console.log('Task running', new Date())
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error)
    return
  }
  if (data) {
    const { locations } = data
    updateLocation(locations[0])
  }
})

export default BackgroundTracking
