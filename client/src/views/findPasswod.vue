<template>
  <SidebarOnTopLayout>
    <h1>비밀번호 찾기</h1>
    <InputField
      id="email"
      label="이메일"
      placeholder="이메일을 입력해주세요."
      v-model="name"
    ></InputField>
    <InputField
      id="name"
      label="이름"
      placeholder="이름을 입력해주세요."
      v-model="tel"
    ></InputField>
    <Button size="medium" @click="findPw">비밀번호 찾기</Button>
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
import { findPw } from '@/api/member'
import Alert from '@/components/common/Alert.vue'
import Button from '@/components/common/Button.vue'
import InputField from '@/components/common/InputField.vue'
import SidebarOnTopLayout from '@/layouts/SidebarOnTopLayout.vue'

export default {
  name: 'findPw',
  components: {
    SidebarOnTopLayout,
    InputField,
    Button,
    Alert,
  },
  methods: {
    async findPw() {
      findPw()
    },
  },
}
</script>
s
