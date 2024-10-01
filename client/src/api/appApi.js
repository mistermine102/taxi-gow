import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const appApi = axios.create({
  baseURL: 'https://e52e-109-173-197-185.ngrok-free.app',
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
