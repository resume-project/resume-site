const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Node.js 서버
        changeOrigin: true, // 서버의 origin을 프록시로 변경
        pathRewrite: { '^/api': '' }, // '/api' 접두사를 제거
      },
    },
  },
})
