var isRealString = (str) => {
  return typeof(str) === 'string' && str.trim().length > 0;
};


var capitalize = (str) => {
  var res = str.trim().toLowerCase().split('');
  res[0] = res[0].toUpperCase();
  return res.join('');
};


module.exports = {isRealString, capitalize};



