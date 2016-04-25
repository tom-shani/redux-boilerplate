export default function clientMiddleware(client) {
  return ({dispatch, getState}) =>
    (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }

      const {promise, types, ...rest} = action // eslint-disable-line no-redeclare
      if (!promise) return next(action)

      if (!types) return Promise.reject(new Error('no types provided to clientMiddleware'))

      const [REQUEST, SUCCESS, FAILURE] = types
      next({...rest, type: REQUEST})

      const actionPromise = promise(client)
      actionPromise.then(
        (payload) => next({...rest, payload, type: SUCCESS}),
        (error) => next({...rest, error: new Error(error.error), type: FAILURE})
      ).catch((error) => {
        if (__DEVELOPMENT__) {
          console.error('MIDDLEWARE ERROR:', error) // eslint-disable-line no-console
        }

        next({...rest, error: new Error(error.error), type: FAILURE})
      })

      return actionPromise
    }
}
