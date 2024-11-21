<template>
  <div id="app">
    <!-- 로딩 상태와 에러 메시지 표시 -->
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <!-- 하위 컴포넌트로 상태 전달 -->
    <router-view
      :loading="loading"
      :error="error"
      @setLoading="setLoading"
      @setError="setError"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loading: false,
      error: null,
    }
  },
  methods: {
    setLoading(status) {
      this.loading = status
    },
    setError(message) {
      this.error = message
    },
  },
}
</script>
