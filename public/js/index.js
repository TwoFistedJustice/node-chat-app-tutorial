// var socket = io();


//add a unique event listener that listens for a rooms list update
// but this doesn't get called every time user list update
// this is only used while the log in page is displayed
// the event is only emitted on initial connection


// the event listener updates the room selection drop down

// on clicking a selection, a join event is emitted, similar to
// when a user types a new room name

// get basic drop down populated from an array

//  connect server, but only to fetch the rooms list

// pass in rooms list - fill dropdown from that

// when user


$(document).ready(function(){
  
  // turn the dropdown and text box into vars
  
  // decorate the dropdown when disabled
  // or change the text value to "uncheck box to select"
  
  
  var list = ["General chat", "Node course chat", "Not safe for work"];
  var dropdown = $("#room-drop-down");
  
  var isInFocus = jQuery.expr[':'].focus = function( elem ) {
    return elem === document.activeElement && ( elem.type || elem.href );
  };
  
  var dropdown = $('#room-drop-down');
  var roomTextBox = $('#room-text');
  var checkBox = $('#because-its-easier-thats-why');
  
  
  
  for (var i =0; i < list.length; i++){
    $(dropdown).append($("<option / >").val(list[i]).text(list[i]));
  }
  
  
  checkBox.change(function(){
    
    if((checkBox).is(':checked')){
      
      roomTextBox.prop('disabled', false);
      dropdown.prop('disabled', true);
    } else {
      dropdown.prop('disabled', false);
      roomTextBox.prop('disabled', true);
    }
  })
  
  roomTextBox.click(function(){
  
    roomTextBox.prop('name', "room");
    dropdown.prop('name', false);
  });
  
  
  dropdown.click(function(){
  
    dropdown.prop('name', "room");
    roomTextBox.prop('name', false);
    
  });
  
// a click on the room text
  //disables the dropdown
  // enables the text box
// adds the 'name = room' attr to the room text box
// removes it from drop down


// a click on the dropdown
  //enables the dropdown
  //disables the text box
// reverses the above
  
  
  
});