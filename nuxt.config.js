// HTML Page Options.
exports.head = {
  title: 'Lit Games - WebVR Adventures',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Lit Games is a collection of WebVR Adventures.'
    }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  script: [
    // { src: '//cdn.jsdelivr.net/npm/aframe@latest/dist/aframe.min.js' },
    // { src: '//cdn.rawgit.com/matthewbryancurtis/aframe-star-system-component/db4f1030/index.js' }
    { src: '/socket.io/socket.io.js' },
    { src: '/aframe.js' }
  ]
}

exports.modules = [ '~/plugins/io/server' ]

// Progress Bar Options.
exports.loading = { color: '#3B8070' }

// Build configuration.
exports.build = {
  // Run ESLint on save.
  extend (config, { isDev, isClient }) {
    if (isDev && isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
