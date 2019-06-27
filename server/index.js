const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const expressValidator = require('express-validator');
app.use(session({
  secret: 'ilovescotchsco', // session secret
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const http = require('http');
const productApi = require('./routes/products')
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
// app.use(cors())
app.use(bodyParser.json())
// app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/product',productApi)
app.use(express.static('public'))
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
