const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin')

module.exports = {
  //用以开发阶段的显示报错或打印的信息来源
  devtool: 'inline-source-map',
  mode: 'production',
  entry: ['babel-polyfill', path.join(__dirname, './src/main.js')],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    lodash: '_',
    axios: 'axios',
    cropper: 'Cropper'
  },
  module: {
    rules: [
      // css-loader
      {
        test: /\.css$/,
        use: ExtractTextWebapckPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      //file-loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      //less-loader
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      //babel 转换代码自动兼容一些低版本的浏览器,代码量过大
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, //不转换node_modules中的文件模块
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
            plugins: ['transform-runtime'],
            presets: ['env']
          }
        }
      },
      // vue-loader
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  plugins: [
    //自动在打包目录中打包一个网页
    new htmlWebpackPlugin({
      template: './index.html'
      //filename: "./page0.html"
    }),
    // 热处理
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // vue-loader
    new VueLoaderPlugin(),

    new ExtractTextWebapckPlugin('style.css')
  ],
  devServer: {
    hot: true, // 热重载
    contentBase: './', // webpack-dev-server自动打包，自动开启服务器，自动打开页面，自动刷新
    port: '5000',
    proxy: {
      // 代理'/api' 访问路径为 3000/*
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  }
}