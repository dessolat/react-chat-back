const app = require('express')();
const server = require('http').createServer(app);
const router = require('./router/Router');
const io = require('socket.io')(server, {
  cors: {
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 5000;

app.use('/', router);

io.on('connection', socket => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('join', user => {
    socket.join(user.channel);
  });

  socket.on('send-message', (user, message) => {
    io.in(user.channel).emit('receive-message', user.name, message);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
