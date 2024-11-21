<template>
  <div
    :class="[
      'radio-wrapper',
      `radio-${type}`,
      `radio-${size}`,
      { 'radio-disabled': disabled },
    ]"
    @click="handleClick"
  >
    <input
      type="radio"
      class="radio-input"
      :disabled="disabled"
      :checked="isChecked"
      :value="optionName"
      @change="updateValue"
    />
    <label class="radio-label">
      <slot>{{ optionName }}</slot>
    </label>
  </div>
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
    optionName: {
      type: String,
      default: '',
    },
    modelValue: {
      // v-model에 연결된 값
      type: String,
      default: '',
    },
  },
  computed: {
    isChecked() {
      return this.modelValue === this.optionName
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.updateValue()
      }
    },
    updateValue() {
      this.$emit('update:modelValue', this.optionName) // 선택된 값 업데이트
    },
  },
}
</script>
<style scoped>
/* Wrapper 스타일 */
.radio-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  transition: all 0.3s ease;
}

/* 비활성화 스타일 */
.radio-wrapper.radio-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 라디오 입력 스타일 */
.radio-input {
  width: 18px;
  height: 18px;
  appearance: none;
  border: 2px solid #bdc3c7;
  border-radius: 50%;
  background-color: white;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.radio-input:checked {
  background-color: var(--radio-color, #3498db);
  border-color: var(--radio-color, #3498db);
}

.radio-input:focus {
  box-shadow: 0 0 5px var(--radio-color, #3498db);
}

/* 라벨 스타일 */
.radio-label {
  font-size: 16px;
  color: #333;
  user-select: none;
}

/* 타입별 스타일 */
.radio-primary .radio-input {
  --radio-color: #3498db;
}

.radio-secondary .radio-input {
  --radio-color: #95a5a6;
}

.radio-danger .radio-input {
  --radio-color: #e74c3c;
}

/* 크기별 스타일 */
.radio-small .radio-input {
  width: 14px;
  height: 14px;
}

.radio-medium .radio-input {
  width: 18px;
  height: 18px;
}

.radio-large .radio-input {
  width: 22px;
  height: 22px;
  border-width: 3px;
}

.radio-small .radio-label {
  font-size: 14px;
}

.radio-medium .radio-label {
  font-size: 16px;
}

.radio-large .radio-label {
  font-size: 18px;
}
</style>
