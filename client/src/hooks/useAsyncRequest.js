import { useState } from 'react'

export default () => {
  const [isLoading, setIsLoading] = useState(false)

  const send = async (fn, errHandler) => {
    try {
      setIsLoading(true)
      await fn()
    } catch (err) {
      errHandler(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    send,
  }
}
