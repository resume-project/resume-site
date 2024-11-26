import axios from './axios'

// 모든 트윗 또는 특정 사용자 트윗 조회
export const join = async (data) => {
  try {
    const response = await axios.post('/member/join', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error(
      error.response?.data?.message || '회원가입에 실패하였습니다.',
    )
  }
}
