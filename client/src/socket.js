import { io } from 'socket.io-client'
import appApi from './api/appApi'

const URL = appApi.getUri()

export default socket = io(URL)
