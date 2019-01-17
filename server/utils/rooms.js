// expects io.sockets.adapter.rooms
// the object contains "rooms" some of which are actual rooms
// an others are users who happen to be the longest remaining user in a room
// each "room" has a list of sockets, which are socket.id (user id)
// if a "room" is actually a user, it will have itself listed as socket
// if a "room" is actually a room, it will NOT have itself listed as a socket


var roomConstants = {
  "General chat": true,
  "Node course chat": true,
  "Not safe for work": true
};


var getRoomsList = (rooms) => {
  // var roomsList = [];
  var roomsList = Object.keys(roomConstants);
  
  // for(room in rooms) {
  //   if(!rooms[room].sockets.hasOwnProperty(room)) {
  //     roomsList.push(room);
  //   }
  // }
  
  for(room in rooms) {
    if(!roomConstants.hasOwnProperty(room) && !rooms[room].sockets.hasOwnProperty(room)) {
      roomsList.push(room);
    }
  }
  
  return roomsList;
};

module.exports = {getRoomsList};