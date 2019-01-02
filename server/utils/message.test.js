var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
  it('should generate correct message object', () => {
    let from = 'test@test.com';
    let text = "testy mcTestFace";
    let message = generateMessage(from, text);
    
    
    expect(message).toInclude({from, text});
    //assert that from is correct
    expect(message.from).toExist();
    expect(message.from).toBe(from);
    // assert that text matches up
    expect(message.text).toExist();
    expect(message.text).toBe(text);
    // assert that create at value is a number
    expect(message.createdAt).toExist();
    expect(message.createdAt).toBeA('number');
  });
  
  });
  

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Testy McTestface';
    let lat = 1.1;
    let long = -2.2;
    let url = 'https://www.google.com/maps?q=1.1,-2.2'
    let location = generateLocationMessage(from,lat, long);
  
    expect(location).toExist();
    expect(location).toInclude({from, url});
    expect(location.from).toBe(from);
    expect(location.url).toExist();
    expect(location.url).toBe(url);
    expect(location.createdAt).toExist();
    expect(location.createdAt).toBeA('number');
  
    
  });
})
  