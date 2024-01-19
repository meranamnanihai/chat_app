const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io')
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit('message', message);
  })
  socket.on("user-connected", (name) => {
    socket.broadcast.emit("message", `${name} has joined the chat`)
  })


});


server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});
