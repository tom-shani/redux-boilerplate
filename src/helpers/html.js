import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    /* eslint-disable react/jsx-sort-props */
    return (
      <html lang='en-us'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel='apple-touch-icon' sizes='57x57' href='/favicon/apple-touch-icon-57x57.png'/>
          <link rel='apple-touch-icon' sizes='60x60' href='/favicon/apple-touch-icon-60x60.png'/>
          <link rel='apple-touch-icon' sizes='72x72' href='/favicon/apple-touch-icon-72x72.png'/>
          <link rel='apple-touch-icon' sizes='76x76' href='/favicon/apple-touch-icon-76x76.png'/>
          <link rel='apple-touch-icon' sizes='114x114' href='/favicon/apple-touch-icon-114x114.png'/>
          <link rel='apple-touch-icon' sizes='120x120' href='/favicon/apple-touch-icon-120x120.png'/>
          <link rel='apple-touch-icon' sizes='144x144' href='/favicon/apple-touch-icon-144x144.png'/>
          <link rel='apple-touch-icon' sizes='152x152' href='/favicon/apple-touch-icon-152x152.png'/>
          <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon-180x180.png'/>
          <link rel='icon' type='image/png' href='/favicon/favicon-32x32.png' sizes='32x32'/>
          <link rel='icon' type='image/png' href='/favicon/favicon-194x194.png' sizes='194x194'/>
          <link rel='icon' type='image/png' href='/favicon/favicon-96x96.png' sizes='96x96'/>
          <link rel='icon' type='image/png' href='/favicon/android-chrome-192x192.png' sizes='192x192'/>
          <link rel='icon' type='image/png' href='/favicon/favicon-16x16.png' sizes='16x16'/>
          <link rel='manifest' href='/favicon/manifest.json'/>
          <link rel='mask-icon' href='/favicon/safari-pinned-tab.svg' color='#8e2800'/>
          <link rel='shortcut icon' href='/favicon/favicon.ico'/>
          <meta name='msapplication-TileColor' content='#da532c'/>
          <meta name='msapplication-TileImage' content='/favicon/mstile-144x144.png'/>
          <meta name='msapplication-config' content='/favicon/browserconfig.xml'/>
          <meta name='theme-color' content='#8e2800'/>

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link
              charSet='UTF-8'
              href={assets.styles[style]}
              key={key}
              media='screen, projection'
              rel='stylesheet'
              type='text/css'
            />
          )}
        </head>
        <body>
          <div dangerouslySetInnerHTML={{__html: content}} id='content'/>
          <script charSet='UTF-8' dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}/>
          <script charSet='UTF-8' src={assets.javascript.main}/>
        </body>
      </html>
    );
  }
}
