import createHistory from 'history/lib/createMemoryHistory';
import createStore from '../redux/create-store';
import getRoutes from '../routes';
import Html from '../helpers/html';
import {match, RouterContext} from 'react-router';
import PrettyError from 'pretty-error';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/server';

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
const pretty = new PrettyError();

export function errorHandler(error, req, res) {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', pretty.render(error)); // eslint-disable-line no-console
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  res.end(JSON.stringify({error: 'proxy_error', reason: error.message}));
}

export function renderHandler(req, res) {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const history = createHistory();
  const store = createStore();

  function hydrateOnClient() {
    res.send('<!doctype html>\n' + // eslint-disable-line prefer-template
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({history, routes: getRoutes(store), location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error)); // eslint-disable-line no-console
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const component = (
        <Provider key='provider' store={store}>
          <div id='provider-sub'>
            <RouterContext {...renderProps} />
          </div>
        </Provider>
      );

      res.status(200).send('<!doctype html>\n' + // eslint-disable-line prefer-template
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />));
    } else {
      res.status(404).send('Not found');
    }
  });
}
