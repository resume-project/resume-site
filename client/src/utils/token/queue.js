let isTokenRefreshing = false
const requestQueue = []

export const isTokenRefreshingState = () => isTokenRefreshing

export const setTokenRefreshing = (status) => {
  isTokenRefreshing = status
}

export const enqueueRequest = (callback) => {
  requestQueue.push(callback)
}

export const processRequestQueue = (newToken) => {
  requestQueue.forEach((callback) => callback(newToken))
  requestQueue.length = 0
}
