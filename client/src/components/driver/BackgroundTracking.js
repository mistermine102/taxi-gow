import { Text, View, Alert, Button } from 'react-native'
import { BaseButton } from '../base/base'
import { useState } from 'react'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BackgroundTracking = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  const handleButtonPress = async () => {
    try {
      await requestPermissions()
      await enableBackgroundTracking()
      setIsEnabled(!isEnabled)
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

  const enableBackgroundTracking = async () => {
    try {
      const LOCATION_TASK_NAME = 'background-location-task'

      TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        console.log('Task running', new Date())
        if (error) {
          // Error occurred - check `error.message` for more details.
          return
        }
        if (data) {
          const { locations } = data

          const prevLocationsItem = await AsyncStorage.getItem('prevLocations')

          if (!prevLocationsItem) return await AsyncStorage.setItem('prevLocations', JSON.stringify([]))

          const prevLocations = JSON.parse(prevLocationsItem)
          prevLocations.push(locations)

          return await AsyncStorage.setItem('prevLocations', JSON.stringify(prevLocations))
        }
      })

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
      console.log(err)
    }
  }

  return (
    <View className="mt-2">
      <Text className="text-darkGray font-bold mb-2">Śledzenie lokalizacji w tle {isEnabled ? 'włączone' : 'wyłączone'}</Text>
      <BaseButton alt={isEnabled} title={isEnabled ? 'Wyłącz' : 'Włącz'} onPress={handleButtonPress} />
      <Button
        title="Pokaż lokalizacje"
        onPress={async () => {
          try {
            let locations = await AsyncStorage.getItem('prevLocations')
            locations = JSON.parse(locations)

            let message = ''

            for (const location of locations) {
              const { latitude, longitude } = location[0].coords
              message += `${latitude}, ${longitude}\n`
            }

            Alert.alert('Lokalizacje', message)
          } catch (err) {
            console.log(err)
          }
        }}
      />
      <View className="mt-1">
        <Button
          title="Wyczyść lokalizacje"
          onPress={() => {
            AsyncStorage.removeItem('prevLocations')
          }}
        />
      </View>
    </View>
  )
}

export default BackgroundTracking
