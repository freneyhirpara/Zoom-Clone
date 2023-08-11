const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const getVisitors = () => {
  let clients = io.of('/').sockets;
  console.log(clients);
  let sockets = Object.values(clients);
  let users = sockets.map((s) => s.user);
  console.log(users);
  return users;
};

const emitVisitors = () => io.emit('visitors', getVisitors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('new_visitor', (user) => {
    console.log('new user', user);
    socket.user = user;
    emitVisitors();
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    emitVisitors();
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
