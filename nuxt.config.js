const pkg = require('./package')
module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'data:image/png;base64,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' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://use.fontawesome.com/releases/v5.7.0/css/all.css' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/animate.css@3.5.1' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://raw.githubusercontent.com/daneden/animate.css/master/animate.css' },
            {  src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' }
        ]
    },
    
    /*
     ** Customize the progress-bar color
     */
    // loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    // server: {
    //     port: 6000, // default: 3000
    //     host: '0.0.0.0', // default: localhost
    // },
    css: ['~/assets/main.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
    ],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) { }
    }
}