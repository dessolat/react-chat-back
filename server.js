const app = require('express')();
const server = require('http').createServer(app);
const router = require('./router/Router');
const io = require('socket.io')(server, {
  cors: {
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 5000;
const { addUser, getChannelUsers, removeUser } = require('./handleUsers');

app.use('/', router);

io.on('connection', socket => {
  console.log('Client connected');

  socket.on('disconnect', () => {
		removeUser(socket.name)
		io.to(socket.channel).emit('user-left', socket.name)
    console.log(`${socket.name} disconnected`);
  });

  socket.on('join', (user, getUsers) => {
    socket.name = user.name;
		socket.channel = user.channel;
    socket.join(user.channel);
    addUser(user);
    getUsers(getChannelUsers(user.channel));
		socket.to(socket.channel).emit('user-join', user)
  });

  socket.on('send-message', (user, message) => {
    io.in(user.channel).emit('receive-message', user.name, message);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
