const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    // proxy : 'http://192.168.0.39:8180'
    //proxy : 'http://localhost:8180'
    proxy : process.env.VUE_PROXY_URL
  }
})
