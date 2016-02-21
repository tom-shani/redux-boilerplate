import {name, version} from '../package.json';

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

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
      link: [
        // {rel: 'canonical', href: 'http://mysite.com/example'},
        {rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png'},
        {rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png'},
        {rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png'},
        {rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png'},
        {rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png'},
        {rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png'},
        {rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png'},
        {rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png'},
        {rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png'},
        {rel: 'shortcut icon', href: '/favicon/favicon.ico'}
        // {rel: 'manifest', href: '/favicon/manifest.json'}
      ],
      meta: [
        {charset: 'utf-8'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        // {name: 'msapplication-TileColor', content: '#ffffff'},
        // {name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ],
      script: [
        // {src: '/phaser.min.js', type: 'text/javascript'}
      ]
    }
  }
}, environment);
