import axios from './axios'

// 모든 트윗 또는 특정 사용자 트윗 조회
export const getTweets = async (username) => {
  try {
    const response = await axios.get('/tweets', { params: { username } })
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '트윗을 불러오는 데 실패했습니다.',
    )
  }
}

// 특정 트윗 조회
export const getTweet = async (id) => {
  try {
    const response = await axios.get(`/tweets/${id}`)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '트윗을 불러오는 데 실패했습니다.',
    )
  }
}

// 트윗 작성
export const createTweet = async (tweetData) => {
  try {
    const response = await axios.post('/tweets', tweetData)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '트윗 작성에 실패했습니다.',
    )
  }
}

// 트윗 삭제
export const deleteTweet = async (id) => {
  try {
    const response = await axios.delete(`/tweets/${id}`)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '트윗 삭제에 실패했습니다.',
    )
  }
}
