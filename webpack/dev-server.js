import Express from 'express'
import webpack from 'webpack'
import config from '../src/config'
import webpackConfig from './config.dev'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const compiler = webpack(webpackConfig)
const host = config.host || 'localhost'
const port = parseInt(config.port, 10) + 1 || 3001
const serverOptions = {
  contentBase: `http://${host}:${port}`,
  headers: {'Access-Control-Allow-Origin': '*'},
  hot: true,
  inline: true,
  lazy: false,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  stats: {colors: true},
}

const app = new Express()
app.use(webpackDevMiddleware(compiler, serverOptions))
app.use(webpackHotMiddleware(compiler))

app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port)
  }
})
