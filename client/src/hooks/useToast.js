import { useState } from 'react'

let timeoutId

export default () => {
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [toastTitle, setToastTitle] = useState('Toast')
  const TOAST_DURATION = 2500

  const showToast = title => {
    clearTimeout(timeoutId)
    setToastTitle(title)
    setIsToastVisible(true)
    timeoutId = setTimeout(() => setIsToastVisible(false), TOAST_DURATION)
  }

  return {
    showToast,
    isToastVisible,
    toastTitle,
  }
}
