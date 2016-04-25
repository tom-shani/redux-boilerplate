/* eslint-disable no-console */
import express from 'express'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'
import config from '../src/config'
import cors from 'cors'
import PrettyError from 'pretty-error'
import http from 'http'

const corsOptions = {
  origin: true,
  methods: 'OPTIONS,POST'
}

const pretty = new PrettyError()
const app = express()
const server = new http.Server(app) // eslint-disable-line no-unused-vars

app.use(cookieSession({secret: '!rujWq2LwQ1^5886QYBlZJXF'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use((req, res, next) => {
  const requestURL = req.originalUrl
  let promise = null

  if (requestURL.substr(0, 8) === '/wallet/') promise = null

  // can't find a route
  if (promise === null) return res.status(404).end('NOT FOUND')

  return promise
    .then(res.json)
    .catch((error) => {
      console.error(pretty.render(error))

      if (error && error.redirect) res.redirect(error.redirect)
      else res.status(error.status || 500).json({error: error.message})
    })
})

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => { // eslint-disable-line no-unused-vars
    if (err) console.error(pretty.render(err))
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort)
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
