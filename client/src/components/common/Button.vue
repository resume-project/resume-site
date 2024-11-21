<template>
  <button
    :class="['btn', `btn-${type}`, `btn-${size}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary', // 'primary', 'secondary', 'danger' 등
    },
    size: {
      type: String,
      default: 'medium', // 'small', 'medium', 'large'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
  },
}
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.btn-small {
  font-size: 14px;
  padding: 6px 12px;
}

.btn-medium {
  font-size: 16px;
  padding: 10px 20px;
}

.btn-large {
  font-size: 18px;
  padding: 14px 28px;
}

.btn-disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.btn:focus {
  outline: none;
}
</style>
