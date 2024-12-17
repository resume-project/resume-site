<template>
  <div v-if="visible" :class="['alert', `alert-${type}`]">
    <span class="alert-message">
      <slot></slot>
    </span>
    <button class="alert-close-btn" @click="close">×</button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info', // 'info', 'warning', 'error', 'success'
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style scoped>
/* Alert 그라데이션 애니메이션 */
.gradient-alert {
  position: fixed;
  top: 20px; /* 화면 상단에서 약간 아래 */
  left: 50%;
  transform: translateX(-50%);
  width: 0; /* 초기 너비 */
  overflow: hidden; /* 애니메이션 중 내용이 튀어나오지 않도록 */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  animation: grow-width 1s ease-in-out forwards; /* 애니메이션 적용 */
}

/* Alert 내부 스타일 */
.gradient-alert Alert {
  padding: 15px;
  color: #333;
}

/* 너비 확장 애니메이션 */
@keyframes grow-width {
  0% {
    width: 0; /* 시작 너비 */
    opacity: 0; /* 완전히 투명 */
  }
  100% {
    width: 300px; /* 최종 너비 */
    opacity: 1; /* 완전히 보이도록 */
  }
}
.alert {
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.alert-info {
  background-color: #e6f7ff;
  color: #00529b;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-close-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: inherit;
}

.alert-close-btn:hover {
  color: #888;
}
</style>
