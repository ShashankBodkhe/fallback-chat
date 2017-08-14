const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = require("http").createServer(app);
const io = socketIO.listen(server,{
	"transports":["polling"],
	"polling duration":"10"
});
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

//some variables to keep track of all the socket connections
let connections = [];
let users = [];
let i = 1;

io.sockets.on('connection', (socket) => {
  
  //providing username info for connection
  let agentNumber = i++;
  console.log('Client connected : ' + agentNumber);
  console.log({username:agentNumber});
  connections.push(socket);
  users.push(agentNumber);
  socket.emit('socket_initialized', { username : agentNumber });
  socket.username = agentNumber;


  //broadcasting messages
  socket.on('new_message', (message) => {
    console.log('received message : ' + message);
    io.sockets.emit('get_message',message);
  });


  //Disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.username);
    connections.splice(connections.indexOf(socket),1);
    users.splice(users.indexOf(socket.username),1);
  });
});