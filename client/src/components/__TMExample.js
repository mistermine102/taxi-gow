import React from 'react'
import { Button, View, StyleSheet } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'

const LOCATION_TASK_NAME = 'background-location-task'

const requestPermissions = async () => {
  try {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
    if (foregroundStatus === 'granted') {
      console.log("Foreground permission granted")
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
      if (backgroundStatus === 'granted') {
        console.log('Background permission granted')
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 1000,
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const PermissionsButton = () => (
  <View style={styles.container}>
    <Button onPress={requestPermissions} title="Enable background locationnnn" />
  </View>
)

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log("Error with location:", error)
    return
  }
  if (data) {
    const { locations } = data
    console.log("Getting location");
    
    // do something with the locations captured in the background
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default PermissionsButton
