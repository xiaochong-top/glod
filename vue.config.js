const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // },
    proxy: 'https://www.sge.com.cn'
  },
})
