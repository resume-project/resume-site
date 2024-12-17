import axios from './axios'

export const join = async (data) => {
  try {
    const response = await axios.post('/member/join', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error(
      error.response?.data?.message || '회원가입에 실패하였습니다.',
      location.reload,
    )
  }
}

export const login = async (data) => {
  try {
    const response = await axios.post('/member/login', data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '로그인에 실패하였습니다.',
      location.reload,
    )
  }
}

export const findId = async (data) => {
  try {
    const response = await axios.post('/member/findId', data)
    return response.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error(
      error.response?.data?.message || '아이디찾기에 실패하였습니다.',
      location.reload,
    )
  }
}

export const findPw = async (data) => {
  try {
    const response = await axios.post('/member/findPw', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error(
      error.response?.data?.message || '아이디찾기에 실패하였습니다.',
      location.reload,
    )
  }
}
