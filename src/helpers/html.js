import React, {Component, PropTypes} from 'react'
import {renderToString} from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

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
  }

  render() {
    const {assets, component, store} = this.props
    const content = component ? renderToString(component) : ''
    const head = Helmet.rewind()

    const initialStateProps = {
      charSet: 'UTF-8',
      dangerouslySetInnerHTML: {
        __html: `window.INITIAL_STATE=${serialize(store.getState())}`
      }
    }

    return (
      <html lang='en-us'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

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
          <script {...initialStateProps}/>
          <script charSet='UTF-8' src={assets.javascript.main}/>

        </body>
      </html>
    )
  }
}
