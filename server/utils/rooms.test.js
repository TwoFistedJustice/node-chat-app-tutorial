// require('./testServer');
require('../server');
const client = require('socket.io-client');
const expect = require('expect');
const uri = 'http://localhost:3000/';
const {roomConstants} = require('./rooms');
var testRoom = 'TestRoom'
const params = {
  name: 'Testy McUnitTest',
  room: 'Testroom'
};
const rooms = Object.keys(roomConstants);
rooms.push(params.room);
let socket;


beforeEach((done) => {
  socket = client.connect(uri);
  socket.on('connect', () => {
  done();
  })
});

describe('get rooms list from socket.io', (done) => {
  it ('should get the rooms list', (done) => {
    socket.on ('updateRoomsList', (data) => {
      expect(data).toBeAn('array');
      expect (data).toEqual(rooms)
      done ();
    });
    
    socket.emit ('join', params, function (err) {
      if (err) {
        console.log (err);
      } else {
        console.log (`no error`);
      }
    });
  });
});
