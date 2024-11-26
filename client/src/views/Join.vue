<template>
  <SidebarOnTopLayout>
    <h1>Join ✋🏾</h1>
    <InputField
      id="email"
      label="Email"
      placeholder="Enter your email"
      v-model="email"
    />
    <InputField
      id="password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      v-model="password"
    />
    <InputField
      id="name"
      label="Name"
      placeholder="Enter your name"
      v-model="name"
    />
    <InputField
      id="age"
      label="Age"
      placeholder="Enter your age"
      v-model="age"
    />
    <Radio id="gender" label="Gender" option-name="Male" v-model="gender" />
    <Radio id="gender" label="Gender" option-name="Female" v-model="gender" />
    <br />
    <Button type="primary" @click="showModal = true">주소 입력</Button>
    <Modal
      :visible="showModal"
      @update:visible="showModal = $event"
      title="주소 검색"
    >
      <p>주소를 검색해주세요.</p>
      <KaKaoAddressAPI
        :visible="showModal"
        @update:visible="showModal = $event"
      />
    </Modal>
    <InputField
      id="tel"
      label="Phone"
      placeholder="Enter your phone number"
      v-model="tel"
    />
    <Button type="primary" @click="join">회원 가입</Button>

    <div>
      <Alert
        class="gradient-alert"
        v-if="successAlertVisible"
        type="success"
        @update:visible="alertVisible = $event"
      >
        This is a success alert!
      </Alert>
      <Alert
        class="gradient-alert"
        v-if="failAlertVisible"
        type="error"
        @update:visible="alertVisible = $event"
      >
        {{ msg }}
      </Alert>
    </div>
  </SidebarOnTopLayout>
</template>
<style>
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
</style>
<script>
import SidebarOnTopLayout from '@/layouts/SidebarOnTopLayout.vue'
import Button from '@/components/common/Button.vue'
import InputField from '@/components/common/InputField.vue'
import Alert from '@/components/common/Alert.vue'
import Radio from '@/components/common/Radio.vue'
import KaKaoAddressAPI from '@/components/common/KaKaoAddressAPI.vue'
import Modal from '@/components/common/Modal.vue'
import { join } from '@/api/member'

export default {
  name: 'Join',
  components: {
    SidebarOnTopLayout,
    InputField,
    Button,
    Alert,
    Radio,
    KaKaoAddressAPI,
    Modal,
  },
  data() {
    return {
      successAlertVisible: false,
      failAlertVisible: false,
      email: '',
      password: '',
      tel: '',
      name: '',
      age: 0,
      gender: '',
      msg: '',
      optionName: '',
      showModal: false,
      errors: [],
    }
  },
  methods: {
    async join() {
      const patterns = {
        email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        age: /^\d{1,3}$/,
        name: /^[가-힣a-zA-Z\s]{2,30}$/,
        gender: /^(male|female)$/,
        tel: /^010-\d{4}-\d{4}$/,
        address: /^.{5,100}$/,
        postcode: /^\d{5}$/,
      }

      let data = {
        email: this.email,
        password: this.password,
        name: this.name,
        age: this.age,
        gender: this.gender,
        tel: this.tel,
        postcode:
          localStorage.getItem('postcode') === undefined
            ? ''
            : localStorage.getItem('postcode'),
        address:
          localStorage.getItem('address') === undefined
            ? ''
            : localStorage.getItem('address'),
      }

      // 유효성 검사 실행
      this.errors = [] // 매번 초기화
      for (const [field, pattern] of Object.entries(patterns)) {
        // postCode와 address는 로컬스토리지에서 가져오기
        const value =
          field === 'postcode' || field === 'address'
            ? localStorage.getItem(field)
            : data[field]

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

      await join(data)
    },
  },
}
</script>
