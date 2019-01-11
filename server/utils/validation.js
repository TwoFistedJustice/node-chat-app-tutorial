var isRealString = (str) => {
  return typeof(str) === 'string' && str.trim().length > 0;
};


// expects name to be a string and namesArray to be an array of strings
var isUniqueUser = (name, namesArray) => {
  // if some are the same, return false, if none are the same return true
  return !namesArray.some((existingUser) => name.toLowerCase() === existingUser.toLowerCase())
};


var capitalize = (str) => {
  var res = str.trim().toLowerCase().split('');
  res[0] = res[0].toUpperCase();
  return res.join('');
};




module.exports = {isRealString, isUniqueUser, capitalize};



