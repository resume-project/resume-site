import axios from './axios'

// 모든 트윗 또는 특정 사용자 트윗 조회
export const join = async (data) => {
  try {
    console.log('들어옴')
    const response = await axios.get('/join', { params: { data } })
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '회원가입에 실패하였습니다.',
    )
  }
}
