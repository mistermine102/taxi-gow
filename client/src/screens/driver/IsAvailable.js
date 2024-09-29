import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import appApi from '../../api/appApi'
import { BaseSwitch } from '../../components/base/base'

const IsAvailable = () => {
  const isFocused = useIsFocused()
  const [hasActiveRoute, setHasActiveRoute] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)

  const toggleSwitch = async () => {
    try {
      setIsAvailable(!isAvailable)
      await appApi.patch('/users/availability')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!isFocused) return

    const getAvailability = async () => {
      try {
        const response = await appApi.get('/users/availability')
        setHasActiveRoute(response.data.hasActiveRoute)
        setIsAvailable(response.data.isAvailable)
      } catch (err) {
        console.log(err)
      }
    }
    getAvailability()
  }, [isFocused])

  return (
    <View className="flex-row justify-between items-center">
      <Text>Dostępny</Text>
      <BaseSwitch value={isAvailable} onPress={toggleSwitch} disabled={hasActiveRoute} />
    </View>
  )
}

export default IsAvailable
