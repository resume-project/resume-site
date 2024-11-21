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
