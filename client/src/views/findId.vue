<template>
  <SidebarOnTopLayout>
    <h1>아이디 찾기</h1>
    <InputField
      id="name"
      label="이름"
      placeholder="이름을 입력해주세요."
      v-model="name"
    ></InputField>
    <InputField
      id="tel"
      label="전화번호"
      placeholder="전화번호를 입력해주세요."
      v-model="tel"
    ></InputField>
    <Button size="medium" @click="findId">아이디 찾기</Button>
    <Alert
      class="gradient-alert"
      v-if="successAlertVisible"
      type="success"
      @update:visible="alertVisible = $event"
    >
      아이디
    </Alert>
    <Alert
      class="gradient-alert"
      v-if="failAlertVisible"
      type="error"
      @update:visible="alertVisible = $event"
    >
      {{ msg }}
    </Alert>
  </SidebarOnTopLayout>
</template>

<script>
import { findId } from '@/api/member'
import Alert from '@/components/common/Alert.vue'
import Button from '@/components/common/Button.vue'
import InputField from '@/components/common/InputField.vue'
import SidebarOnTopLayout from '@/layouts/SidebarOnTopLayout.vue'

export default {
  name: 'findId',
  components: {
    SidebarOnTopLayout,
    InputField,
    Button,
    Alert,
  },
  data() {
    return {
      name: '',
      tel: '',
      msg: '',
      successAlertVisible: false,
      failAlertVisible: false,
    }
  },
  methods: {
    async findId() {
      const patterns = {
        name: /^[가-힣a-zA-Z\s]{2,30}$/,
        tel: /^010-\d{4}-\d{4}$/,
      }

      let data = {
        name: this.name,
        tel: this.tel,
      }

      // 유효성 검사 실행
      this.errors = [] // 매번 초기화
      for (const [field, pattern] of Object.entries(patterns)) {
        const value = data[field]

        // null 체크 및 정규식 검증
        if (!value || !pattern.test(value)) {
          this.failAlertVisible = true
          this.msg = `${field}가 공백이거나 형식이 올바르지 않습니다.`
          setTimeout(() => {
            this.failAlertVisible = false
          }, 5000)
          return false
        }
      }

      await findId(data)
    },
  },
}
</script>
