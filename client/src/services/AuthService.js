import { EventBus } from '@/utils/eventBus'
import { logIn, logout } from '@/api/member'
import {
  getAccessToken,
  saveAccessToken,
  clearAccessToken,
} from '@/utils/token/storage'

export const AuthService = {
  isLoggedIn: false,

  async login(email, password) {
    try {
      const response = await logIn(email, password)
      const { accessToken } = response.data
      saveAccessToken(accessToken)
      this.isLoggedIn = true
      EventBus.$emit('authChange', { isLoggedIn: true })
      return response.data
    } catch (error) {
      console.error('Login failed:', error.message)
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  async logout() {
    try {
      await logout()
      clearAccessToken()
      this.isLoggedIn = false
      EventBus.$emit('authChange', { isLoggedIn: false })
    } catch (error) {
      console.error('Logout failed:', error.message)
      throw new Error(error.response?.data?.message || 'Logout failed')
    }
  },

  checkLoginStatus() {
    const accessToken = getAccessToken()
    this.isLoggedIn = !!accessToken
    EventBus.$emit('authChange', { isLoggedIn: this.isLoggedIn })
    return this.isLoggedIn
  },
}
