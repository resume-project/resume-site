<template>
  <div>
    <nav>
      <ul>
        <li v-if="isLoggedIn"><a href="/profile">Profile</a></li>
        <li v-if="isLoggedIn"><a href="#" @click="handleLogout">Logout</a></li>
        <li v-else><a href="/login">Login</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import { AuthService } from '@/services/AuthService'

export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
    }
  },
  created() {
    this.isLoggedIn = AuthService.checkLoginStatus()
    this.manageAuthChangeEvent(true)
  },
  methods: {
    async handleLogout() {
      try {
        await AuthService.logout()
      } catch (error) {
        console.error('Logout failed:', error.message)
      }
    },

    updateLoginStatus(authStatus) {
      this.isLoggedIn = authStatus.isLoggedIn
    },

    manageAuthChangeEvent(register) {
      const method = register ? '$on' : '$off'
      EventBus[method]('authChange', this.updateLoginStatus)
    },
  },
  beforeDestroy() {
    this.manageAuthChangeEvent(false)
  },
}
</script>
