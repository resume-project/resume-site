import axios from '@/utils/axios/interceptors.js'
import { saveAccessToken } from '@/utils/token/storage.js'

export const join = async (data) => {
  try {
    const response = await axios.post('/member/join', data)
    return response.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error(
      error.response?.data?.message || '회원가입에 실패하였습니다.',
      location.reload,
    )
  }
}

export const logIn = async (email, password) => {
  return axios.post('/member/login', { email, password })
}

export const logout = async () => {
  return axios.get('/member/logout')
}

export const refreshAccessToken = async () => {
  try {
    const response = await axios.get('/member/token/refresh')
    const { accessToken } = response.data
    saveAccessToken(accessToken)
    return accessToken
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '토큰 갱신에 실패하였습니다.',
    )
  }
}
