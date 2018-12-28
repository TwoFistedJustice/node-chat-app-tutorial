var expect = require('expect');

var {generateMessage} = require('./message');

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
  
  