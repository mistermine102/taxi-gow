import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const appApi = axios.create({
  baseURL: 'https://04b6-109-173-241-208.ngrok-free.app',
})

appApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    if (!token) return config
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err)
)

export default appApi
