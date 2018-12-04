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


app.use (express.static (publicPath));

io.on ('connection', (socket) => {
  // console.log(socket);
  console.log ('New user connected -- server.js io.on()');
  
  
  socket.emit ('newEmail', {
    from: 'joe@example.com',
    text: 'a cuppa joe in the morning',
    createdAt: 123
  });
  
  socket.emit ('newMessage', {
    from: 'larry@larrysusedcars.com',
    text: 'It is better to have loved and lost than to have financed a used car.',
    createdAt: 123
  });
  
  
  // this listens for a new message from index.html, then broadcasts it , via io.emit to all connections
  socket.on ('createMessage', (message) => {
    console.log ('createMessage:', message);
    io.emit ('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date ().getTime ()
    });
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