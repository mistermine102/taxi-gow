import React from 'react'
import { Button, Text, View, StyleSheet, FlatList } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import "../_mockLocation"

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
  const LOCATION_TASK_NAME = 'background-location-task'

  requestPermissions()

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
}

const PermissionsButton = () => {
  const [locations, setLocations] = React.useState([])

  const getLocations = async () => {
    const locationsItem = await AsyncStorage.getItem('prevLocations')
    const parsedLocations = JSON.parse(locationsItem)
    setLocations(parsedLocations)
    console.log(parsedLocations)
  }

  return (
    <View style={styles.container}>
      <Button onPress={requestPermissions} title="Enable background location" />
      <Button onPress={enableBackgroundTracking} title='Enable tracking' />
      <Button onPress={getLocations} title="get locations" />
      <FlatList
        data={locations}
        keyExtractor={item => item[0].timestamp}
        renderItem={({ item }) => <Text>{`${item[0].coords.latitude}, ${item[0].coords.longitude}`}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default PermissionsButton
