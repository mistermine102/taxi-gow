import { useState } from 'react'
import Toast from 'react-native-toast-message'

export default () => {
  const [isLoading, setIsLoading] = useState(false)

  const send = async (fn, errHandler) => {
    try {
      setIsLoading(true)
      await fn()
    } catch (err) {
      if (errHandler) {
        errHandler(err)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Coś poszło nie tak',
          text2: 'Wystąpił błąd, spróbuj ponownie później ',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    send,
  }
}
