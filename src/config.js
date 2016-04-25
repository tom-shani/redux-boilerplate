import {name, version} from '../package.json'

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  isBrowser: typeof window !== 'undefined',
  app: {
    title: name,
    description: version,
    head: {
      titleTemplate: `${name}: %s`,
      meta: [
        {charset: 'utf-8'},
        {content: 'yes', name: 'apple-mobile-web-app-capable'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'description', content: `${name}: %{version}`},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ],
      script: [
        // {src: '/phaser.min.js', type: 'text/javascript'}
      ]
    }
  }
}, environment)
