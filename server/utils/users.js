
// users data structure looks like
// [{
//   id: 'jhjhhjs76s',  // socket.id
//   name: 'Joe',
//   room: 'Some Room'
// }]
//

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }
  
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  
  removeUser(id) {
    // return user that was removed
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  
  getUser(id){
  return this.users.filter((user)=> user.id === id )[0];
  }
  
  // returns an array of all user names in a given room
  getUserList(room){
    // return an array of string names // reduce?
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name );
    return namesArray;
  }
  
  // returns an array of all user names independent of room
  getAllUsers() {
    return this.users.map((user)=> user.name);
  }
  
  
};


module.exports = {Users};


/*

class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }
  
  getUserDescription() {
    return `${this.name} is ${this.age} years old`
  }
}

var me = new Person('Russ', 'purple');

var description = me.getUserDescription();
  console.log(description);
  
  */
