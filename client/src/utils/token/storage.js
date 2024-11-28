export const getAccessToken = () => localStorage.getItem('accessToken')

export const saveAccessToken = (token) =>
  localStorage.setItem('accessToken', token)

export const clearAccessToken = () => localStorage.removeItem('accessToken')
