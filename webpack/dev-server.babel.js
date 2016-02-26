import Express from 'express';
import webpack from 'webpack';
import config from '../src/config';
import webpackConfig from './config.dev.babel';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const compiler = webpack(webpackConfig);
const host = config.host || 'localhost';
const port = parseInt(config.port, 10) + 1 || 3001;
const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  hot: true,
  inline: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true},
  watchOptions: {aggregateTimeout: 100}
};

const app = new Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

/* eslint-disable no-console */
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
