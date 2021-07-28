const path = require('path');
const OS = require('os');
// 环境变量
const ENV = process.env;
// tree-shaking
const HappyPack = require('happypack');
// gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length });
const resolve = dir => path.join(__dirname, dir);

// webpack plugins
let _plugins = [
  new HappyPack({
    id: 'happybabel',
    loaders: [
      {
        loader: 'babel-loader?cacheDirectory=true'
      }
    ],
    threadPool: happyThreadPool,
    verbose: true
  })
];

// 如果执行build命令，添加gzip压缩
if (ENV.VUE_APP_ENV === 'production') {
  const _cwp = new CompressionWebpackPlugin({
    algorithm: 'gzip',
    deleteOriginalAssets: true,
    threshold: 0,
    minRatio: 1,
    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$')
  });
  _plugins.push(_cwp);
}

module.exports = {
  // externals: {
  //   vue: 'Vue',
  //   vuex: 'Vuex',
  //   'vue-router': 'VueRouter',
  //   'element-ui': 'ELEMENT'
  // },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 单独将 ElementUI 拆包
        ElementUI: {
          // 打包名称
          name: 'chunk-ElementUI',
          // 权重要大于其他，不然会被打包进 vendors
          priority: 10,
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve('src'),
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happybabel'
      }
    ]
  },
  plugins: _plugins
};
