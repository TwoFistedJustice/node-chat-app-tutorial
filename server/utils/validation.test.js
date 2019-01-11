const expect = require('expect');
const {Users} = require ('./users');
var {isRealString, isUniqueUser ,capitalize} = require('./validation');


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



describe('Unique User Name Validation', () => {
// isUniqueUser returns true if a user is unique
  var users;
  var userList;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {id: '1', name: 'Manny', room: 'Node course'},
      {id: '2', name: 'Moe', room: 'React course'},
      {id: '3', name: 'Jack', room: 'Node course'}
    ];
    
    userList = users.getAllUsers()

  });

  // it should return a boolean
  it('it should return a boolean', () => {
    expect(isUniqueUser('Shemp', userList)).toBeA('boolean');
  });

  // 'it should not reject a unique user'
  it('it should not reject a unique user SHEMP', () => {
    expect(isUniqueUser('Shemp', userList)).toBe(true);
  });

  // 'it should reject a user name already in use'
  it('it should reject a user name already in use MOE', () => {
    expect(isUniqueUser('Moe', userList)).toBe(false);
  });
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

