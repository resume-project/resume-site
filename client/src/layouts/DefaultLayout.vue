<template>
  <div class="default-layout">
    <Header />
    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="content">
        <slot></slot>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
// 공통 컴포넌트 불러오기
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer,
    Sidebar,
  },
}
</script>

<style scoped>
/* 전체 레이아웃 설정 */
.default-layout {
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
  font-size: 1.5rem;
}

/* 메인 콘텐츠 영역 설정 (Flexbox로 Sidebar와 Content 구분) */
.main-content {
  display: flex;
  flex: 1; /* 화면 전체에서 main-content 영역이 차지하는 공간 */
}

/* 사이드바 스타일 */
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* 메인 콘텐츠 영역 */
.content {
  flex: 1; /* 남은 공간을 차지 */
  padding: 20px;
  background-color: #fff;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 푸터 스타일 */
footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 1rem;
  margin-top: auto; /* 푸터를 화면 하단에 고정 */
}
</style>
