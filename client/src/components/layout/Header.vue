<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
      "
    >
      <!-- 헤더 제목 -->
      <span
        style="font-weight: 800; font-size: 46px; cursor: pointer"
        @click="$router.push('/')"
        >Header 🎩</span
      >

      <nav>
        <ul>
          <li v-if="isLoggedIn"><a href="/profile">Profile</a></li>
          <li v-if="isLoggedIn">
            <a href="#" @click="handleLogout">Logout</a>
          </li>
          <li v-else><a href="/login">로그인을 먼저 진행해주세요.</a></li>
        </ul>
      </nav>
    </div>
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
