import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import appApi from '../../api/appApi'
import { BaseSwitch } from '../base/base'
import Loader from '../Loader'
import Toast from 'react-native-toast-message'

const IsAvailable = () => {
  const isFocused = useIsFocused()
  const [hasActiveRoute, setHasActiveRoute] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleSwitch = async () => {
    if (hasActiveRoute) return Toast.show({ type: 'error', text1: 'Posiadasz aktywną trasę', text2: 'Nie możesz obecnie zmienić dostępności' })

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
        setIsLoading(true)
        const response = await appApi.get('/users/availability')
        setHasActiveRoute(response.data.hasActiveRoute)
        setIsAvailable(response.data.isAvailable)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getAvailability()
  }, [isFocused])

  return (
    <View className="flex-row justify-between items-center">
      <Text className="font-bold text-darkGray">Dostępny</Text>
      {isLoading ? <Loader /> : <BaseSwitch value={isAvailable} onPress={toggleSwitch} />}
    </View>
  )
}

export default IsAvailable
