import baseConfig from './config.base';
import mergeConfig from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import webpackIsomorphicTools from './webpack-isomorphic-tools';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicTools);

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT, 10) + 1 || 3001;

const webpackConfigDevelopment = mergeConfig(baseConfig, {
  devtool: 'inline-source-map',

  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      'bootstrap-loader',
      './src/client.js'
    ]
  },

  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']},
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../src/theme'),
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass',
        ],
      },
      {
        test: /\.scss$/,
        exclude: path.join(__dirname, '../src/theme'),
        include: path.join(__dirname, '../src'),
        loaders: [
          'style',
          'css',
          'sass',
          'postcss-loader'
        ],
      }
    ]
  },

  output: {
    filename: '[name]-[hash].js',
    publicPath: `http://${host}:${port}/dist/`
  },

  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
});

export default webpackConfigDevelopment;
