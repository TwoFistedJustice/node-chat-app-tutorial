const path = require ('path'); //node module which normalizes convoluted paths
const express = require ('express');
const http = require ('http'); // required to use socket.io with express
const socketIO = require ('socket.io');


const publicPath = path.join (__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express ();

// normally you pass in a req-res callback, but you can just pass in app here
// Now we are using the http server instead of  the express server
// so we need to change app.listen to server.listen
var server = http.createServer (app); // will be passed into socketIO()
var io = socketIO (server);

const {generateMessage} = require('./utils/message');

app.use (express.static (publicPath));

io.on ('connection', (socket) => {
  // console.log(socket);
  console.log ('New user connected -- server.js io.on()');
  
  
  // socket.emit ('newEmail', {
  //   from: 'joe@example.com',
  //   text: 'a cuppa joe in the morning',
  //   createdAt: 123
  // });
  //
  
  socket.emit('newEmail', generateMessage('joe@example.com', 'a cuppa joe in the morning'));
  
  // socket.emit ('newMessage', {
  //   from: 'larry@larrysusedcars.com',
  //   text: 'It is better to have loved and lost than to have financed a used car.',
  //   createdAt: 123
  // });
  socket.emit('newMessage', generateMessage('larry@larrysusedcars.com', 'It is better to have loved and lost than to have financed a used car.' ));
  
  
  // this listens for a new message from index.html, then broadcasts it , via io.emit to all connections
  socket.on ('createMessage', (message) => {
    console.log ('createMessage:', message);
    // io.emit ('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });
    
    io.emit('createMessage', generateMessage(message.from, message.text));
    
    // socket.emit('newMessage', {
    //   from: 'Darth Admin',
    //   text: 'Welcome to the Sith Chat App',
    //   createAt: new Date().getTime()
    // });
  socket.emit('newMessage', generateMessage('Darth Admin', 'Welcome to the Sith Chat App'));
    
    
    
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   createAt: new Date().getTime()
    // });

    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    
    // .broadcast() emits to every user except the one broadcasting
      // socket.broadcast.emit('newMessage', {
      //   from: message.from,
      //   text: message.text,
      //   createAt: new Date().getTime()
      // });
  });
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