import axiosInstance from './instance.js'
import {
  isTokenRefreshingState,
  setTokenRefreshing,
  enqueueRequest,
  processRequestQueue,
} from '../token/queue.js'
import {
  getAccessToken,
  saveAccessToken,
  clearAccessToken,
} from '../token/storage.js'
import { refreshAccessToken } from '../../api/member.js'

const AUTH_HEADER = 'Authorization'
const TOKEN_TYPE = 'Bearer'

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers[AUTH_HEADER] = `${TOKEN_TYPE} ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isTokenRefreshRequired(error)) {
      error.config._retry = true
      return handleTokenRefresh(error)
    }
    return Promise.reject(error)
  },
)

// Helper functions
function isTokenRefreshRequired(error) {
  const { config, response } = error
  return response && response.status === 401 && !config._retry
}

async function handleTokenRefresh(error) {
  const { config } = error

  if (!isTokenRefreshingState()) {
    setTokenRefreshing(true)
    try {
      const newAccessToken = await refreshAccessToken()
      saveAccessToken(newAccessToken)
      processRequestQueue(newAccessToken)
    } catch (refreshError) {
      console.error(
        `Token refresh failed: ${refreshError.response?.status} - ${
          refreshError.response?.data?.message || refreshError.message
        }`,
      )
      clearAccessToken()
      throw refreshError
    } finally {
      setTokenRefreshing(false)
    }
  }

  return new Promise((resolve) => {
    enqueueRequest((newToken) => {
      config.headers[AUTH_HEADER] = `${TOKEN_TYPE} ${newToken}`
      resolve(axiosInstance(config))
    })
  })
}

export default axiosInstance
