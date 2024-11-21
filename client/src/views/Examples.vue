<template>
  <div class="examples-container">
    <h1>Vue 재사용 가능한 컴포넌트 예시</h1>

    <!-- Button 컴포넌트 -->
    <Button type="primary" size="large" @click="handleButtonClick"
      >Primary Large Button</Button
    >
    <Button type="secondary" size="small" @click="handleButtonClick"
      >Secondary Small Button</Button
    >
    <Button type="danger" :disabled="isButtonDisabled"
      >Disabled Danger Button</Button
    >

    <!-- Modal 컴포넌트 -->
    <Button type="primary" @click="showModal = true">Show Modal</Button>
    <Modal
      :visible="showModal"
      @update:visible="showModal = $event"
      title="Example Modal"
    >
      <p>This is an example of a modal content.</p>
    </Modal>

    <!-- InputField 컴포넌트 -->
    <InputField
      id="username"
      label="Username"
      placeholder="Enter your username"
      v-model="username"
    />
    <InputField
      id="password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      v-model="password"
    />

    <!-- Alert 컴포넌트 -->
    <Alert
      v-if="alertVisible"
      type="success"
      @update:visible="alertVisible = $event"
    >
      This is a success alert!
    </Alert>
    <Alert
      v-if="alertVisible"
      type="error"
      @update:visible="alertVisible = $event"
    >
      This is an error alert!
    </Alert>

    <!-- Card 컴포넌트 -->
    <Card
      title="Card Title"
      text="This is an example card. It can contain any content you like."
      :image="'https://via.placeholder.com/300'"
    >
      <p>Additional content inside the card!</p>
    </Card>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue'
import Modal from '@/components/common/Modal.vue'
import InputField from '@/components/common/InputField.vue'
import Alert from '@/components/common/Alert.vue'
import Card from '@/components/common/Card.vue'

export default {
  name: 'Examples',
  components: {
    Button,
    Modal,
    InputField,
    Alert,
    Card,
  },
  data() {
    return {
      showModal: false,
      alertVisible: true,
      username: '',
      password: '',
      isButtonDisabled: false,
    }
  },
  methods: {
    handleButtonClick() {
      alert('Button clicked!')
    },
  },
}
</script>

<style scoped>
.examples-container {
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

button {
  margin: 10px;
}
</style>
