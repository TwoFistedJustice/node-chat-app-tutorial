//https://www.google.com/maps?q={latitude},{longtitude}
const path = require ('path'); //node module which normalizes convoluted paths
const http = require ('http'); // required to use socket.io with express
const express = require ('express');
const socketIO = require ('socket.io');
const moment = require ('moment');

const {generateMessage, generateLocationMessage} = require ('./utils/message');
const {isRealString, isUniqueUser, capitalize} = require ('./utils/validation');
const {Users} = require ('./utils/users');

const publicPath = path.join (__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express ();

// normally you pass in a req-res callback, but you can just pass in app here
// Now we are using the http server instead of  the express server
// so we need to change app.listen to server.listen
var server = http.createServer (app); // will be passed into socketIO()
var io = socketIO (server);

var users = new Users ();

var face = '◎[▪‿▪]◎';
var face2 = '(づ｡◕‿‿◕｡)づ';
var space27 = '                    ';


app.use (express.static (publicPath));

io.on ('connection', (socket) => {
  // console.log(socket);
  console.log ('New user connected -- server.js io.on()');
  
  socket.on ('join', (params, callback) => {
    if (!isRealString (params.name) || !(isRealString (params.room))) {
      return callback ('name and room name are required');
    } else if (!isUniqueUser(params.name, users.getAllUsers())) {
      return callback('name must be unique');
    }
    params.room = capitalize (params.room);
    socket.join (params.room);
    // to prevent duplicate users and to prevent them from being in more than one room
    // I actually think this call is pointless because the socket id changes with every refresh
    users.removeUser (socket.id);
    users.addUser (socket.id, params.name, params.room)
    
    io.to (params.room).emit ('upateUserList', users.getUserList (params.room));
    
    // socket.leave('BSG Fans);
    // io.emit -> io.to('BSG Fans').emit(...)
    // socket.emit
    
    socket.emit ('newMessage', generateMessage ('Admin', `Welcome to the chat app ${params.name}. You have joined ${params.room}`));
    socket.broadcast.to (params.room).emit ('newMessage', generateMessage ('Admin', `${params.name} has joined`));
    
    callback ();
  });
  
  // this listens for a new message from chat.html, then broadcasts it , via io.emit to all connections
  socket.on ('createMessage', (message, callback) => {
    
    var user = users.getUser (socket.id);
    if (user && isRealString (message.text)) {
      // console.log (face2, 'createMessage:', message);
      // io.emit ('newMessage', generateMessage (message.from, message.text));
      io.to (user.room).emit ('newMessage', generateMessage (user.name, message.text));
    }
    
    
    // callback('This is from the server, and is normally an object'); // acknowledgement
    callback (''); // acknowledgement
  });
  
  socket.on ('createLocationMessage', (coords) => {
    var user = users.getUser (socket.id);
    
    if (user) {
      io.to (user.room).emit ('newLocationMessage', generateLocationMessage (user.name, coords.latitude, coords.longitude));
    }
    
  })
  
  socket.on ('disconnect', () => {
    console.log ('Disonnected from client -- server.js io.on()');
    var user = users.removeUser (socket.id);
    
    if (user) {
      //emit to everyone connected
      io.to (user.room).emit ('upateUserList', users.getUserList (user.room));
      io.to (user.room).emit ('newMessage', generateMessage ('Admin', `${user.name} has left`));
    }
    
  })
  
});


console.log ('__dirname', __dirname);
console.log ('old way: ', __dirname + '/../public');
console.log ('node path module way:', publicPath);


server.listen (port, () => {
  console.log (`Listening on port ${port}`);
});