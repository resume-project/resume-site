<template>
  <div class="sidebar-on-top-layout">
    <Header />
    <aside class="sidebar">
      <Sidebar />
    </aside>
    <main class="main-content">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
  name: 'SidebarOnTopLayout',
  components: {
    Header,
    Footer,
    Sidebar,
  },
}
</script>

<style scoped>
/* 전체 레이아웃 설정 */
.sidebar-on-top-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 헤더 스타일 */
header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

/* 사이드바 스타일 (상단에 위치) */
.sidebar {
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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
