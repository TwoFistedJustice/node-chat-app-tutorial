var socket = io ();

$ (document).ready (function () {
  
  // decorate the dropdown when disabled
  // or change the text value to "uncheck box to select"
  var listPopulate;
  
  var dropdown = $ ('#room-drop-down');
  var roomTextBox = $ ('#room-text');
  var checkBox = $ ('#because-its-easier-thats-why');
  
  listPopulate = function (rooms) {
      for (var i = 0; i < rooms.length; i++) {
        $(dropdown).append ($("<option />").val (rooms[i]).text (rooms[i]));
      }
  };
  
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
    listPopulate(roomsArray)
  });
  
});

