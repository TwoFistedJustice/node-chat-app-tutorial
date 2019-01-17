var socket = io ();

$ (document).ready (function () {
  
  // decorate the dropdown when disabled
  // or change the text value to "uncheck box to select"
  var listPopulate;
  var roomConstants = {
    room1: "General chat",
    room2: "Node course chat",
    room3: "Not safe for work"
  };
  // var list = ["General chat", "Node course chat", "Not safe for work"];
  var listOfRooms = [];
  
  var dropdown = $ ("#room-drop-down");
  
  var dropdown = $ ('#room-drop-down');
  var roomTextBox = $ ('#room-text');
  var checkBox = $ ('#because-its-easier-thats-why');
  
  
  listPopulate = function (rooms) {
    $ (dropdown).append ($ ("<option / >").val (roomConstants.room1).text (roomConstants.room1));
    $ (dropdown).append ($ ("<option / >").val (roomConstants.room2).text (roomConstants.room2));
    $ (dropdown).append ($ ("<option / >").val (roomConstants.room3).text (roomConstants.room3));
    
    // TODO - only if rooms len is greater than zero
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i] !== roomConstants.room1 &&
        rooms[i] !== roomConstants.room2 &&
        rooms[i] !== roomConstants.room3) {
        $ (dropdown).append ($ ("<option / >").val (rooms[i]).text (rooms[i]));
      }
      
    }
    
  };
  
  
  // for (var i =0; i < listOfRooms.length; i++){
  //   $(dropdown).append($("<option / >").val(listOfRooms[i]).text(listOfRooms[i]));
  // }
  //
  
  
  checkBox.change (function () {
    
    if ((checkBox).is (':checked')) {
      
      roomTextBox.prop ('disabled', false);
      dropdown.prop ('disabled', true);
    } else {
      dropdown.prop ('disabled', false);
      roomTextBox.prop ('disabled', true);
    }
  })
  
  roomTextBox.click (function () {
    
    roomTextBox.prop ('name', "room");
    dropdown.prop ('name', false);
  });
  
  
  dropdown.click (function () {
    
    dropdown.prop ('name', "room");
    roomTextBox.prop ('name', false);
    
  });
  
  
  socket.on ('newConnection', function (roomsArray) {
    // if arr len is greater than zero
    // check each element to see if it is already in list
    // if it is NOT, add it
    listPopulate (roomsArray)
  });
  
  
});

