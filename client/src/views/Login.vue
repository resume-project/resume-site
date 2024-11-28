<template>
  <SidebarOnTopLayout>
    <h1>Login ✋🏾</h1>
    <InputField
      id="email"
      label="Email"
      placeholder="Enter your email"
      v-model="email"
    />
    <InputField
      id="password"
      label="Password"
      placeholder="Enter your password"
      v-model="password"
    />
    <Button type="primary" @click="handleClick">로그인</Button>
  </SidebarOnTopLayout>
</template>

<script>
import SidebarOnTopLayout from '@/layouts/SidebarOnTopLayout.vue'
import InputField from '@/components/common/InputField.vue'
import Button from '@/components/common/Button.vue'
import { AuthService } from '@/services/AuthService'

export default {
  name: 'Login',
  components: {
    SidebarOnTopLayout,
    InputField,
    Button,
  },
  methods: {
    async handleClick() {
      try {
        await AuthService.login(this.email, this.password)
        alert('로그인에 성공했습니다!')
        this.$router.push({ name: 'Home' })
      } catch (error) {
        alert(error.response?.data?.message || '로그인에 실패했습니다.')
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
}
</script>
