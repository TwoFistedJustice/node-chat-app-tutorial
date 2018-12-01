const path = require('path'); //node module which normalizes convoluted paths
const express = require('express');
const http = require('http'); // required to use socket.io with express
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

// normally you pass in a req-res callback, but you can just pass in app here
// Now we are using the http server instead of  the express server
// so we need to change app.listen to server.listen
var server = http.createServer(app); // will be passed into socketIO()
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  // console.log(socket);
  console.log('New user connected -- server.js io.on()');
  
  socket.on('disconnect', () => {
    console.log('Disonnected from client -- server.js io.on()');
  })
});


console.log('__dirname', __dirname);
console.log('old way: ', __dirname + '/../public');
console.log('node path module way:', publicPath);


server .listen(port, () => {
  console.log(`Listening on port ${port}`);
});