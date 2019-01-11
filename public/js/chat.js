var socket = io(); // this creates our connection and the name is important

var scrollToBottom = function() {
  //see video 9-16
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight'); //always a fixed value for a given viewport
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
  //   console.log(face2, 'should scroll');
  //   console.log(`${face2}
  //   \n clientHeight: ${clientHeight}
  //   \n scrollTop: ${scrollTop}
  //   \nnewMessageHeight: ${newMessageHeight}
  //   \n lastMessageHeight: ${lastMessageHeight}
  //   \n scrollHeight: ${scrollHeight}`);
};

var face = '◎[▪‿▪]◎';
var face2 = '(づ｡◕‿‿◕｡)づ';
var space27 = '                    ';
var acknowledgement = function(data) {
  console.log ('Acknowledgment of message received!', data);
};

//mustn't use arrow functions in client side bc not all browsers support it.
socket.on('connect', function() {
  console.log (`Connected to server${space27}${face2}\n${space27}-- index.js`);
  var params = jQuery.deparam(window.location.search);
  
  socket.emit('join', params, function(err) {
    if (err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log(face2, `no error`);
    }
  });
  
});


socket.on('disconnect', function () {
  console.log (`Disconnected from server${space27}${face2}\\n${space27}-- index.js`);
});

socket.on('upateUserList', function(users){
  console.log(face2, 'line 5* Users List:', users);
  var ol = jQuery('<ol></ol>');
  
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newEmail', function(dataReceived){
  console.log(`New email!${space27}${face2}\n${space27}-- index.js`, dataReceived);
});

socket.on('newMessage', function(message) {
  var template = jQuery('#message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
    
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // console.log(`New message received.${space27}${face2}\\n${space27}-- index.js`, message);
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
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

socket.on('newLocationMessage', function(message){
  console.log('NEW LOCATION MESSAGE');
  var formattedTime = moment().format('h:mm a');
  
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  //
  // li.append(a);
  // jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    // from: 'User',
    text: messageTextbox.val()
  }, function(){
    console.log('acknowledgement from jquery form select');
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
   if (!navigator.geolocation) {
     return alert('Geolocation not supported by your browser');
   }
   // this disables the button while location is being fetched. The disabled attribute is removed in the success handler.
   locationButton.attr('disabled', 'disabled').text('Sending location...');
   navigator.geolocation.getCurrentPosition(function(position) {
   console.log('line 64', position);
   
   locationButton.removeAttr('disabled').text('Send location');
     socket.emit('createLocationMessage', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     }, function(){
       console.log('acknowledgement from jquery form select');
     });
   
   }, function() {
     alert('Unable to fetch location');
   });
   
});

