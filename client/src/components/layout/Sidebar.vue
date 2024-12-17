<template>
  <div>
    <h1>Sidebar 🚥</h1>
    <div>
      <ul v-if="isLoginBoxView">
        <li>
          <div style="width: 100%; height: 200px" id="loginBox" v-if="!isLogin">
            <InputField
              id="id"
              style="width: 180px"
              label="아이디"
              placeholder="아이디를 입력해주세요."
              v-model="email"
            ></InputField>
            <InputField
              id="pw"
              type="password"
              style="width: 180px; margin-bottom: 0px"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              v-model="password"
            ></InputField>
            <ul>
              <li style="text-align: center">
                <a href="#" @click="login()">로그인</a> /
                <a href="/join">회원가입</a>
              </li>
            </ul>
          </div>
          <div id="memberInfoBox" v-if="isLogin">로그인 성공</div>
        </li>
        <li>
          마이페이지
          <ul>
            <li><a href="/findId">아이디 찾기</a></li>
            <li><a href="/findPw">비밀번호 찾기</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
a {
  text-decoration: none;
  color: black;
}
ul {
  list-style: none;
  padding: 10px;
}
ul > li {
  border: solid 3px gray;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 5px;
  font-weight: 700;
}
</style>
<script>
import { login } from '@/api/member'
import InputField from '../common/InputField.vue'

export default {
  name: 'Sidebar',
  data() {
    return {
      email: '',
      password: '',
      isLogin: false,
      isLoginBoxView:
        location.href
          .substring(location.href.lastIndexOf('/') + 1)
          .replace('#', '') === '' ||
        location.href
          .substring(location.href.lastIndexOf('/') + 1)
          .replace('#', '') === '/'
          ? true
          : false,
    }
  },
  components: {
    InputField,
  },
  methods: {
    async login() {
      const response = await login({
        email: this.email,
        password: this.password,
      })

      if (response.token) {
        alert('로그인에 성공하셨습니다.')
        this.isLogin = !this.isLogin
      } else {
        alert('로그인에 실패하셨습니다.')
      }
    },
  },
}
</script>
