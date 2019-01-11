const expect = require('expect');
var {isRealString, capitalize} = require('./validation');


describe('input string validation', () => {

  it('should accept strings with non-space characters', () => {
    var res = isRealString('valid');
    expect(res).toBe(true);
  });
  
  it('should accept strings with leading spaces', () => {
    var res = isRealString(' leading space');
    expect(res).toBe(true);
  })
  
  it('should accept strings with trailing spaces', () => {
  var res = isRealString('trailing spaces   ');
  expect(res).toBe(true);
  });
  
  it('should accept strings with both leading and trailing spaces', () => {
    var res = isRealString('  leading and trailing spaces   ');
    expect(res).toBe(true);
  })
  
  it('should reject empty strings', () => {
    var res = isRealString('');
    expect(res).toBe(false);
  });
  
  it('should reject strings consisting of all spaces', () => {
    var res = isRealString('    ');
    expect(res).toBe(false);
  });
  
  it('should reject non-string data types', () => {
    expect(isRealString(true)).toBe(false);
    expect(isRealString(3)).toBe(false);
    expect(isRealString({text: 'will fail'})).toBe(false);
    expect(isRealString()).toBe(false);
    expect(isRealString(NaN)).toBe(false);
  })
});


describe('Capitalize strings', () => {

  it('should capitalize the first character of a lower case string', () => {
    expect(capitalize('le')).toBe('Le');
  });
  
  it('should capitalize the first character of an upper case string', () => {
    expect(capitalize('LE')).toBe('Le');
  });
  
  it('should capitalize the first character of a mixed  case string', () => {
    expect(capitalize('leTtEr')).toBe('Letter');
  });
  
  it('should trim leading and ending spaces', () => {
  expect(capitalize('  le  ')).toBe('Le');
  })
  
  
});


// this is correct when the following conditions are true

// it returns a boolean
// it returns true when
//   given a string with non space character
// given a string with leading spaces
// given a string with trailing spaces
//given a string with both leading and trailing spaces


// it returns false when
//  given an empty string
//  given a number
//  given a boolean
// given an object
// given undefined
// given NaN

