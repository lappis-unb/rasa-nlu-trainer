import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3030'
})

api.interceptors.request.use(async (config) => {
  const token = getToken()
  const configAuthorized = config
  if (token) {
    configAuthorized.headers.Authorization = `Baerer ${token}`
  }
  return config
})

export default api
