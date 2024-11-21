<template>
  <div class="full-width-layout">
    <Header />
    <main class="main-content">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'FullWidthLayout',
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
/* 전체 레이아웃 설정 */
.full-width-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 */
}

/* 헤더 스타일 */
header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

/* 메인 콘텐츠 스타일 */
.main-content {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 푸터 스타일 */
footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}
</style>
