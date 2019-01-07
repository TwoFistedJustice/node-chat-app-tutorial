//https://www.google.com/maps?q={latitude},{longtitude}
const path = require ('path'); //node module which normalizes convoluted paths
const express = require ('express');
const http = require ('http'); // required to use socket.io with express
const socketIO = require ('socket.io');
const moment = require('moment');


const publicPath = path.join (__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express ();

// normally you pass in a req-res callback, but you can just pass in app here
// Now we are using the http server instead of  the express server
// so we need to change app.listen to server.listen
var server = http.createServer (app); // will be passed into socketIO()
var io = socketIO (server);

const {generateMessage, generateLocationMessage} = require ('./utils/message');


var face = '◎[▪‿▪]◎';
var face2 = '(づ｡◕‿‿◕｡)づ';
var space27 = '                    ';



app.use (express.static (publicPath));

io.on ('connection', (socket) => {
  // console.log(socket);
  console.log ('New user connected -- server.js io.on()');
  
  // socket.emit ('newMessage', generateMessage ('larry@larrysusedcars.com', 'It is better to have loved and lost than to have financed a used car.'));
  
  socket.broadcast.emit ('newMessage', generateMessage('Admin', 'New user joined'));
  
  // this listens for a new message from chat.html, then broadcasts it , via io.emit to all connections
  socket.on('createMessage', (message, callback) => {
    
    
    console.log (face2, 'createMessage:', message);
    io.emit ('newMessage', generateMessage (message.from, message.text));
  
    // callback('This is from the server, and is normally an object'); // acknowledgement
    callback(''); // acknowledgement
  });
  
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })
  
  socket.on ('disconnect', () => {
    console.log ('Disonnected from client -- server.js io.on()');
  })
  
});


console.log ('__dirname', __dirname);
console.log ('old way: ', __dirname + '/../public');
console.log ('node path module way:', publicPath);


server.listen (port, () => {
  console.log (`Listening on port ${port}`);
});