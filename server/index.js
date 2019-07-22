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
const userApi = require('./routes/user')
const ratingApi = require('./routes/rating')
const commentApi = require('./routes/comment')
const checkoutApi = require('./routes/checkout')
const chatApi = require('./routes/chat')
const billApi = require('./routes/bill')
const addressApi = require('./routes/address')
const uploadImage = require('./routes/uploadImage')
const notificationApi = require('./routes/notification')
// Import and Set Nuxt.js options

// app.use(cors())
app.use(bodyParser.json())
// app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/product', productApi)
app.use('/api/cart', cartApi)
app.use('/api/chat', chatApi)
app.use('/api/wishe', wisheApi)
app.use('/api/follow', followApi)
app.use('/api/user', userApi)
app.use('/api/room', roomApi)
app.use('/api/rating', ratingApi)
app.use('/api/comment', commentApi)
app.use('/api/checkout', checkoutApi)
app.use('/api/upload', uploadImage)
app.use('/api/address', addressApi)
app.use('/api/notification', notificationApi)
app.use('/api/bill', billApi)
app.use(express.static('public'))

const { ADD_MESSAGE } = require('./socket/socket')
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev modess
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console.
const messages = []
const userOnline = []
const tata = []
sockets = [];
people = {};
io.on('connection', (socket) => {
  socket.on('joinRoom', function (data) {
    people[socket.id] = { data: data };
    console.log(people)
    socket.emit('userOnline', people)
  })
  socket.on('disconnect', function () {
    delete people[socket.id];
    sockets.splice(sockets.indexOf(socket), 1);
    console.log(people)
    // app.get('/update', async (req, res) => {
    //   var users = await models.users.findOne({ where: { id: 2 } })
    //   // users.set('updatedAt', new Date())
    //   users.update({
    //     phone: 2
    //   });
    //   users.save()
    //   const nDate = new Date().toLocaleString('en-US', {
    //     timeZone: 'Asia/Ho_Chi_Minh'
    //   });

    //   console.log(nDate);
    //   var date = new Date()
    //   return res.json({ nDate: nDate, user: users })
    // })
  });
  socket.on('send-message', async (message) => {
    console.log(people)
    console.log(message)
    var name = message.nameuser
    var receiverSocketId = findUserById(name);
    if (receiverSocketId) {
      // var receiver = people[receiverSocketId];
      var room = message.roomid;
      socket.join(room);
      io.sockets.connected[receiverSocketId].join(room);
      //notify the client of thisss
      var message = await ADD_MESSAGE({ data: message })
      // socket.broadcast.to(room).emit('new-message', await ADD_MESSAGE({ data: message }));
      socket.broadcast.to(room).emit('new-message', room, message);
      await ADD_MESSAGE({ data: message })
    } else {
      console.log('vao day')
      var room = message.roomid;
      // socket.broadcast.to(room).emit('new-message', room, message);
      // socket.broadcast.to(room).emit('new-message', await ADD_MESSAGE({ data: message }));
      await ADD_MESSAGE({ data: message })
    }

  })

  socket.on('send-nofi-cmt', async (message) => {
    console.log(people)
    console.log(message)
    var name = message.nameuser
    var receiverSocketId = findUserById(name);
    if (receiverSocketId) {
      // var receiver = people[receiverSocketId];
      var room = message.roomid;
      socket.join(room);
      io.sockets.connected[receiverSocketId].join(room);
      //notify the client of thisss
      socket.broadcast.to(room).emit('nhannhe', room, message);
      // await ADD_MESSAGE({ data : message})
    } else {
      console.log('vao day')
      var room = message.roomid;
      socket.broadcast.to(room).emit('new-message', room, message);
      // await ADD_MESSAGE({ data : message})
    }

  })

  socket.on('userTyping', data => {
    var anhquy = 'Đang trả lời '
    socket
      .to(data.room)
      .emit('receivedUserTyping', data);
  });
  socket.on('removeUserTyping', data => {
    // data.room = ''
    var idroom  ={
      room : -1
    }
    socket
      .to(data.room)
      .emit('receivedUserTyping', idroom);
  });
  function findUserById(name) {
    console.log(people)
    for (socketId in people) {
      if (people[socketId].data === name) {
        console.log('anhquy')
        console.log(people[socketId])
        return socketId;
      }
    }
    return false;
  }
})