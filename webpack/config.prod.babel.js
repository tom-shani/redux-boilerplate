import baseConfig from './config.base';
import mergeConfig from 'webpack-merge';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import webpackIsomorphicTools from './webpack-isomorphic-tools';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

const host = process.env.HOST || 'localhost';
const apihost = process.env.APIHOST || 'localhost';

const webpackConfigProduction = mergeConfig(baseConfig, {
  devtool: 'source-map',
  entry: {
    main: [
      'bootstrap-loader/extractStyles',
      './src/client.js'
    ]
  },

  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader', 'strip-loader?strip[]=debug']},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' +
          '!postcss'
        )
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../src/theme'),
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' +
          'postcss?sourceMap' +
          'sass?sourceMap=true&sourceMapContents=true'
        )
      },
      {
        test: /\.scss$/,
        exclude: path.join(__dirname, '../src/theme'),
        include: path.join(__dirname, '../src'),
        loader: ExtractTextPlugin.extract(
          'style',
          'css' +
          '!sass?sourceMap' +
          '!postcss-loader?sourceMap'
        )
      }
    ]
  },

  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: '/build/'
  },

  plugins: [
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}), // css files from the extract-text-plugin loader
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        HOST: JSON.stringify(host),
        APIHOST: JSON.stringify(apihost)
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/), // ignore dev config

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }),

    new WebpackIsomorphicToolsPlugin(webpackIsomorphicTools)
  ]
});

export default webpackConfigProduction;
