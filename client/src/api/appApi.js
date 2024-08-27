import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ec34-109-173-196-137.ngrok-free.app',
})

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    if (!token) return config
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err)
)

export default instance