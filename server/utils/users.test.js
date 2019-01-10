const expect = require ('expect');
const {Users} = require ('./users');


describe ('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {id: '1', name: 'Manny', room: 'Node course'},
      {id: '2', name: 'Moe', room: 'React course'},
      {id: '3', name: 'Jack', room: 'Node course'}
      ];
  });
  
  it ('should add new user', () => {
    var users = new Users ();
    var user = {
      id: '123',
      name: 'Joe',
      room: 'BSG Fans'
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    // users array was updated
    expect(users.users).toEqual([user]);

  });

  it ('should return a list of names for node course', () => {
  var res = ['Manny', 'Jack'];
  expect(users.getUserList('Node course')).toEqual(res);
  });

  it ('should return a list of names for react course', () => {
  var res = ['Moe'];
  expect(users.getUserList('React course')).toEqual(res);
  })
  
  it ('should remove a user', () => {
    var changed = [
      {id: '1', name: 'Manny', room: 'Node course'},
      {id: '2', name: 'Moe', room: 'React course'}
    ];
    
    var removed = {id: '3', name: 'Jack', room: 'Node course'};
    
    expect(users.removeUser('3')).toEqual(removed);
    expect(users.users).toEqual(changed);
    expect(users.users.length).toBe(2);
  });
  
  it ('should not remove user', () => {
   //assert array has not changed
    var expected = [
      {id: '1', name: 'Manny', room: 'Node course'},
      {id: '2', name: 'Moe', room: 'React course'},
      {id: '3', name: 'Jack', room: 'Node course'}
    ];
    
    var res = users.removeUser('A');
    expect(users.users).toEqual(expected);
  })

  // getUser()
  it ('should find user', () => {
     var userId = '2';
     var res = users.getUser(userId);
     expect(res.id).toEqual(userId);

  });

  it ('should not find user', () => {
     var res = users.getUser('A');
     expect(res).toNotExist();
     expect(users.users.length).toBe(3);
  });

  
});