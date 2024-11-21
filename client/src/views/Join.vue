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
      title="Example Modal"
    >
      <p>주소를 검색해주세요.</p>
      <KaKaoAddressAPI />
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
    }
  },
  methods: {
    join() {
      let email = document.getElementById('email').value
      let password = document.getElementById('password').value
      let name = document.getElementById('name').value
      let age = document.getElementById('age').value
      let gender = document.querySelector('input[name="gender"]:checked').value // 선택된 라디오 버튼 값 가져오기
      let tel = document.getElementById('tel').value

      // 주소 로컬스토리지에 저장까지 했고 다음 항목부터 받으면 된다 현우야
      let zonecode = localStorage.getItem('zonecode')
      let address = localStorage.getItem('address')

      if (email.trim() === '') {
        this.failAlertVisible = true
        this.msg = '이메일을 입력해주세요.'
        setTimeout(() => {
          this.failAlertVisible = false
        }, 5000)
        return false
      } else if (password.trim() === '') {
        this.failAlertVisible = true
        this.msg = '비밀번호를 입력해주세요.'
        setTimeout(() => {
          this.failAlertVisible = false
        }, 5000)
        return false
      } else if (age.trim() === '') {
        this.failAlertVisible = true
        this.msg = '비밀번호를 입력해주세요.'
        setTimeout(() => {
          this.failAlertVisible = false
        }, 5000)
        return false
      } else if (name.trim() === '') {
        this.failAlertVisible = true
        this.msg = '비밀번호를 입력해주세요.'
        setTimeout(() => {
          this.failAlertVisible = false
        }, 5000)
        return false
      } else if (gender.trim() === '') {
        this.failAlertVisible = true
        this.msg = '비밀번호를 입력해주세요.'
        setTimeout(() => {
          this.failAlertVisible = false
        }, 5000)
        return false
      } else if (!zonecode || !address) {
        this.failAlertVisible = true
        this.msg = '주소를 입력해주세요..'
        setTimeout(() => {
          this.failAlertVisible = false
        }, 5000)
        return false
      } else if (tel.trim() === '') {
        this.failAlertVisible = true
        this.msg = '전화번호를 입력해주세요.'
        setTimeout(() => {
          this.failAlertVisible = false
        }, 5000)
        return false
      }

      let data = {
        email: email,
        password: password,
        name: name,
        age: age,
        gender: gender,
        tel: tel,
        zonecode: zonecode,
        address: address,
      }

      join(data)
    },
  },
}
</script>
