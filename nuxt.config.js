require('dotenv').config()

const env = process.env
const isProd = env.MODE == 'prod'
const mockServer = 'http://yapi.demo.qunar.com/mock/62886'
// 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock'

// 不能以斜杠结尾
let apiServer = process.env.API_SERVER
// 必须以斜杠结尾
let publicPath = process.env.PUBLIC_PATH

const config = {
  aliIconFont: '',
  env: {
    mock: {
      '/deepexi-tenant': mockServer,
      '/deepexi-permission': mockServer
    },
    dev: {
      '/deepexi-tenant': apiServer,
      '/deepexi-permission': apiServer
    }
  }
}

let axios = {
  proxy: true
}

// 如果生产指定apiServer, 则使用绝对路径请求api
if (isProd && apiServer) {
  axios = {
    proxy: false,
    baseURL: apiServer
  }
}
// http://yapi.demo.qunar.com/mock/62886 不能删除
// http://rest.apizza.net/mock/9c3dbb2a718e099c106d23019ca0c4de 其他地方的mock数据，测试一哈啊
module.exports = {
  mode: 'spa',
  env: {
    NO_LOGIN: process.env.NO_LOGIN,
    COOKIE_PATH: process.env.COOKIE_PATH || '/'
  },
  proxy: [
    [
      '/api',
      {
        target: 'http://rest.apizza.net/mock/9c3dbb2a718e099c106d23019ca0c4de', //
        pathRewrite: {'^/api': '/'}
      }
    ]
  ],
  // proxy: config.env[env.MODE],
  router: {
    middleware: ['meta'],
    mode: 'hash'
  },
  /*
   ** Build configuration
   */
  build: {
    publicPath,
    extractCSS: true,
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Optimus',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {'http-equiv': 'x-ua-compatible', content: 'IE=edge, chrome=1'},
      {
        hid: 'description',
        name: 'description',
        content: '开发平台'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/favicon32x32.png'
      },
      {
        // rel: 'stylesheet',
        // type: 'text/css',
        // href: config.aliIconFont
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#1890ff'
  },
  css: [
    {
      src: '~assets/global.less',
      lang: 'less'
    }
  ],
  srcDir: 'src/',
  plugins: [
    {
      src: '~/plugins/axios'
    },
    {
      src: '~/plugins/element'
    }
  ],
  modules: [['@nuxtjs/axios'], ['@nuxtjs/dotenv', {path: './'}]],
  axios
}
