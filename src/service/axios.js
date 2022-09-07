import axios from 'axios'

const BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL
const ACCESS_TOKEN = import.meta.env.VITE_MOVIE_ACCESS_TOKEN

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${ACCESS_TOKEN}`
  }
})

instance.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default instance