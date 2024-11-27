import axios from 'axios'

const axiosInstance = axios.create({
  //baseURL: process.env.VUE_APP_API_BASE_URL,
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default axiosInstance
