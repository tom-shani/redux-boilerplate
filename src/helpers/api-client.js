import superagent from 'superagent'
import config from '../config'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl(path) {
  /* eslint-disable prefer-template */
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath
  /* eslint-enable prefer-template */
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) => {
      this[method] = (path, {params, payload} = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))

        if (params) { request.query(params) }
        if (__SERVER__ && req.get('cookie')) { request.set('cookie', req.get('cookie')) }
        if (payload) { request.send(payload) }

        request.end((err, {body} = {}) => {
          if (err) return reject(new Error(body.error))

          return resolve(body)
        })
      })
    })
  }
}

const ApiClient = _ApiClient

export default ApiClient
