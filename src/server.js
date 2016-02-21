import compression from 'compression';
import config from './config';
import {errorHandler, renderHandler} from './helpers/server-handlers';
import Express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyError from 'pretty-error';


const pretty = new PrettyError();

const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({target: `http://${config.apiHost}:${config.apiPort}`, ws: true});

app.use(compression());

app.use(Express.static(path.join(__dirname, '..', 'assets')));
app.use('/api', (req, res) => { proxy.web(req, res); });
proxy.on('error', errorHandler);
app.use(renderHandler);

/* eslint-disable no-console */
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) { console.error(pretty.render(err)); }

    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
