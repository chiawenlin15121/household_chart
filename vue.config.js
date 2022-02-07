const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, './docs'),
  devServer: {
    proxy: {
      '/devapi': {
        target: 'https://od.moi.gov.tw',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/devapi': ''
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/household_chart/' : '/'
}
