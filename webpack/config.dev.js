import baseConfig from './config.base'
import fs from 'fs'
import mergeConfig from 'webpack-merge'
import path from 'path'
import webpack from 'webpack'
import webpackIsomorphicTools from './webpack-isomorphic-tools'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicTools)

const host = process.env.HOST || 'localhost'
const apihost = process.env.APIHOST || 'localhost'
const port = parseInt(process.env.PORT, 10) + 1 || 3001

const babelrc = fs.readFileSync('./.babelrc')
let babelrcObject = {}

try {
  babelrcObject = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {}

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || []
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)

const babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins})
delete babelLoaderQuery.env

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
let reactTransform = null
for (let i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  const plugin = babelLoaderQuery.plugins[i]
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}]
  babelLoaderQuery.plugins.push(reactTransform)
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []})
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
})

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
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: [`babel?${JSON.stringify(babelLoaderQuery)}`]
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../src/theme'),
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass'
        ]
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
        ]
      }
    ]
  },

  output: {
    filename: '[name]-[hash].js',
    publicPath: `http://${host}:${port}/dist/`
  },

  plugins: [
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        HOST: JSON.stringify(host),
        APIHOST: JSON.stringify(apihost)
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    webpackIsomorphicToolsPlugin.development()
  ]
})

export default webpackConfigDevelopment
