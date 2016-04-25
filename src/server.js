import ApiClient from './helpers/api-client'
import compression from 'compression'
import config from './config'
import createHistory from 'react-router/lib/createMemoryHistory'
import createStore from './redux/create-store'
import Express from 'express'
import getRoutes from './routes'
import Html from './helpers/html'
import http from 'http'
import httpProxy from 'http-proxy'
import {match, RouterContext} from 'react-router'
import path from 'path'
import PrettyError from 'pretty-error'
import {Provider} from 'react-redux'
import React from 'react'
import {renderToString} from 'react-dom/server'

const pretty = new PrettyError()

const app = new Express()
const server = new http.Server(app)
const proxy = httpProxy.createProxyServer({target: `http://${config.apiHost}:${config.apiPort}`, ws: true})

app.use(compression())

app.use(Express.static(path.join(__dirname, '..', 'static')))
app.use('/api', (req, res) => { proxy.web(req, res) })
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', pretty.render(error)) // eslint-disable-line no-console
  }

  if (!res.headersSent) res.writeHead(500, {'content-type': 'application/json'})

  res.end(JSON.stringify({error: 'proxy_error', reason: error.message}))
})
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }

  const client = new ApiClient(req)
  const history = createHistory(req.originalUrl)
  const store = createStore(history, client)

  function hydrateOnClient() {
    res.send('<!doctype html>\n' + // eslint-disable-line prefer-template
      renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>))
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient()
    return
  }

 // Match routes based on history object:
  match({history, routes: getRoutes(store), location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error)) // eslint-disable-line no-console
      res.status(500)
      hydrateOnClient()
    } else if (renderProps) {
      const component = (
        <Provider key='provider' store={store}>
          <div id='provider-sub'>
            <RouterContext {...renderProps} />
          </div>
        </Provider>
      )

      res.status(200)

      global.navigator = {userAgent: req.headers['user-agent']}

      res.send('<!doctype html>\n' + // eslint-disable-line prefer-template
        renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />))
    } else {
      res.status(404).send('Not found')
    }
  })
})

/* eslint-disable no-console */
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) { console.error(pretty.render(err)) }

    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
