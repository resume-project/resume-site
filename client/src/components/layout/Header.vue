<template>
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

    <!-- 로그인 버튼 (JWT 값 없을 때만 표시) -->
    <div v-if="!jwt">로그인을 먼저 진행해주세요.</div>
    <div v-if="jwt">{{ name }} 님 환영합니다.</div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      jwt: localStorage.getItem('refreshToken'), // 나중에 소희누나랑 이야기해서 수정
      name: '',
    }
  },
  methods: {},
}
</script>
