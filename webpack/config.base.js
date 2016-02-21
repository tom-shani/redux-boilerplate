import autoprefixer from 'autoprefixer';
import path from 'path';
import CleanPlugin from 'clean-webpack-plugin';
const relativeAssetsPath = 'assets/build';
const assetsPath = path.join(__dirname, '../', relativeAssetsPath);
const nodeModulesPath = path.join(__dirname, '../node_modules');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

export default {
  historyApiFallback: true,

  context: path.resolve(__dirname, '..'),

  module: {
    loaders: [
      {exclude: nodeModulesPath, test: /\.json$/, loader: 'json-loader'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
    ]
  },
  output: {
    path: assetsPath,
    chunkFilename: '[name]-[chunkhash].js',
  },

  progress: true,

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },

  plugins: [
    new CleanPlugin([relativeAssetsPath], {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false
    })
  ],

  postcss: () => {
    return [
      autoprefixer({browsers: ['last 2 versions']})
    ];
  }
};
