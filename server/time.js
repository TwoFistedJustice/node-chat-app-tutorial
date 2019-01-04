//moment is the goto time libary for javascript
//this is a playground file

var moment = require('moment');

var date = moment();

console.log(date.format());
console.log(date.format('Do MMM YYYY'));

date.add(1, 'year');

console.log(date.format('Do MMM YYYY'));

// format time such that it reads the current time in am/pm format


var now = moment();

var formattedNow = now.format('h:mm a')
console.log(formattedNow);

var isTheSameAsASomeTimeStamp = new Date.getTime();
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);