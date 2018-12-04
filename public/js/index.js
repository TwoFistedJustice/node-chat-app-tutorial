var socket = io (); // this creates our connection and the name is important
var face = '◎[▪‿▪]◎';
var face2 = '(づ｡◕‿‿◕｡)づ';
var space27 = '                    ';

//mustn't use arrow functions in client side bc not all browsers support it.
socket.on ('connect', function() {
  console.log (`Connected to server${space27}${face2}\n${space27}-- index.js`);
});

socket.emit('createMessage', {
  to: 'frank@example.com',
  text: 'awwwwww, Frank!'
});

socket.on ('disconnect', function () {
  console.log (`Disconnected from server${space27}${face2}\\n${space27}-- index.js`);
});

socket.on('newEmail', function(dataReceived){
  console.log(`New email!${space27}${face2}\n${space27}-- index.js`, dataReceived);
});


socket.on('newMessage', function(message) {
  console.log(`New message received.${space27}${face2}\\n${space27}-- index.js`, message);
});