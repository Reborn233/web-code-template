// vue.config.js
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
// 环境变量
const ENV = process.env;
const IS_PRODUCTION = ENV.NODE_ENV === 'production';
const webpackConfigDev = require('./build/webpack.dev.conf');
const webpackConfigProd = require('./build/webpack.prod.conf');

module.exports = {
  publicPath: '/',
  outputDir: ENV.outputDir,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: './static/z',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir) 。也可以是一个绝对路径。
  indexPath: './index.html',
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  // 生产环境的 source map
  productionSourceMap: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('vue$', 'vue/dist/vue.esm.js')

    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 加入babel-polyfill，支持ie9+
    config.entry('index').add('babel-polyfill');

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改base64限定值
        options.limit = 10000;
        return options;
      });
  },
  // https://cli.vuejs.org/zh/config/#css-modules
  css: {
    // 是否开启 CSS source map？
    sourceMap: !!IS_PRODUCTION,
    modules: false,
    extract: !!IS_PRODUCTION,
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        // data: '@import "@styles/index.scss";'
      }
    }
  },
  // 开发环境host、port等配置
  devServer: {
    // 端口号
    port: 9595,
    hot: true,
    host: '0.0.0.0',
    // https:{type:Boolean}
    https: false,
    // 配置自动启动浏览器
    open: true,
    // 配置跨域处理,只有一个代理
    // proxy: 'http://localhost:4000'
    // 配置多个代理
    proxy: {
      '/autocloud': {
        // 设置你调用的接口域名和端口号 别忘了加http
        target: 'http://10.181.4.223:9047', // 开发环境
        // target: 'http://10.22.0.22:9048',
        changeOrigin: true
      }
    }
  },
  //  webpack插件配置
  configureWebpack: () => {
    return IS_PRODUCTION ? webpackConfigProd : webpackConfigDev;
  }
};
