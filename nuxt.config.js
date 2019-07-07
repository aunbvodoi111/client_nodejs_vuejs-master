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
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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