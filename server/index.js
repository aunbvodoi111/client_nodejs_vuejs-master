const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const SocketIO = require('socket.io')
const session = require('express-session')
const passport = require('passport')
const http = require('http');
const expressValidator = require('express-validator');
const server = http.createServer(app)
const io = SocketIO(server)

app.use(cors())
app.use(session({
  secret: 'ilovescotchsco', // session secret
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


const productApi = require('./routes/products')
const cartApi = require('./routes/cart')
const roomApi = require('./routes/room')
const wisheApi = require('./routes/wishe')
const followApi = require('./routes/follow')
// Import and Set Nuxt.js options

// app.use(cors())
app.use(bodyParser.json())
// app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/product',productApi)
app.use('/api/cart',cartApi)
app.use('/api/wishe',wisheApi)
app.use('/api/follow',followApi)
app.use('/api/room',roomApi)
app.use(express.static('public'))

const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console
const messages = []
const userOnline = []
const tata = []
 sockets = [];
 people = {};
io.on('connection', (socket) => {
  socket.on('joinRoom', function(data){
    people[socket.id] = {data: data};
    console.log(people)
  })
  socket.on('disconnect', function(){
    delete people[socket.id];
    sockets.splice(sockets.indexOf(socket), 1);
    console.log(people)
  });
  socket.on('send-message', async (message) => {
    console.log('send')
    console.log(message)
    var name = message.nameuser
    var receiverSocketId = findUserById(name);
    if(receiverSocketId){
      // var receiver = people[receiverSocketId];
      var room = message.roomid;
      socket.join(room);
      io.sockets.connected[receiverSocketId].join(room);
      //notify the client of this
      socket.broadcast.to(room).emit('new-message',room,message);
      // await ADD_MESSAGE({ datas : message})
    }else{
      console.log('vao day')
      await ADD_MESSAGE({ data : message})
    }
    
  })
  socket.on('anhquy',async (message)=>{
    io.emit('anhquy',message)
  })
  function findUserById(name){
    console.log(people)
    for(socketId in people){
      if(people[socketId].data === name){
        console.log('anhquy')
        console.log(people[socketId])
        return socketId;
      }
    }
    return false;
  }
})