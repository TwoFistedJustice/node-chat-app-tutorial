var socket = io (); // this creates our connection and the name is important
var face = '◎[▪‿▪]◎';
var face2 = '(づ｡◕‿‿◕｡)づ';
var space27 = '                    ';

var acknowledgement = function(data) {
  console.log ('Acknowledgment of message received!', data);
};

//mustn't use arrow functions in client side bc not all browsers support it.
socket.on ('connect', function() {
  console.log (`Connected to server${space27}${face2}\n${space27}-- index.js`);
});


socket.on ('disconnect', function () {
  console.log (`Disconnected from server${space27}${face2}\\n${space27}-- index.js`);
});

socket.on('newEmail', function(dataReceived){
  console.log(`New email!${space27}${face2}\n${space27}-- index.js`, dataReceived);
});


socket.on('newMessage', function(message) {
  console.log(`New message received.${space27}${face2}\\n${space27}-- index.js`, message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  
  jQuery('#messages').append(li);
});

// if you use acknowledgments, you MUST use it in every instance of the socket emitter, or else it will not work in any of them
// socket.emit('createMessage', {
//   from: 'Frank acknowledgement',
//   text: 'Hi'
// }, acknowledgement
// );

// socket.emit('createMessage', {
//   from: 'frank@example.com',
//   text: 'awwwwww, Frank!'
// }, acknowledgement);


jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){
    console.log('acknowledgement from jquery form select');
  });
});