<template>
  <div class="address-form">
    <input
      type="text"
      id="postcode"
      placeholder="우편번호"
      v-model="zonecode"
      readonly
    />
    <button id="postcode" @click="openPostcode">검색</button><br />
    <input
      type="text"
      v-model="roadAddress"
      placeholder="주소"
      readonly
    /><br />
    <input type="text" v-model="detailAddress" placeholder="상세주소" />
    <button type="button" @click="addressSave">주소 저장</button>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      zonecode: '',
      roadAddress: '',
      detailAddress: '',
    }
  },
  methods: {
    openPostcode() {
      localStorage.setItem('postcode', '')
      localStorage.setItem('address', '')
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
          this.zonecode = data.zonecode
          this.roadAddress = data.roadAddress
        },
      }).open()
    },
    addressSave() {
      localStorage.setItem('postcode', this.zonecode) // zonecode는 v-model에 바인딩된 변수
      localStorage.setItem('address', this.roadAddress + this.detailAddress)
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style scoped>
.address-form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.address-form input,
.address-form button {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.address-form input[readonly] {
  background-color: #f0f0f0;
}

.address-form input:focus,
.address-form button:focus {
  outline: none;
  border-color: #3498db;
}

.address-form button {
  background-color: #3498db;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
}

.address-form button:hover {
  background-color: #2980b9;
}

.address-form input::placeholder {
  color: #aaa;
}

.address-form button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
