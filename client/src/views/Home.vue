<template>
  <DefaultLayout>
    <h1>Home 🏠</h1>
    <!-- 로딩 상태 표시 -->
    <div v-if="loading">Loading tweets...</div>

    <!-- 에러 상태 표시 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 트윗 목록 표시 -->
    <div v-if="!loading && !error && tweets.length">
      <ul>
        <li v-for="tweet in tweets" :key="tweet.id">
          <p>{{ tweet.content }}</p>
        </li>
      </ul>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { tweetApi } from '@/api'

export default {
  name: 'Home',
  components: {
    DefaultLayout,
  },
  props: {
    loading: Boolean,
    error: String,
  },
  data() {
    return {
      tweets: [],
    }
  },
  methods: {
    async fetchTweets() {
      this.$emit('setLoading', true)
      this.$emit('setError', '')
      try {
        const data = await tweetApi.getTweets()
        this.tweets = data
      } catch (err) {
        this.$emit('setError', err)
      } finally {
        this.$emit('setLoading', false)
      }
    },
  },
  mounted() {
    this.fetchTweets()
  },
}
</script>
