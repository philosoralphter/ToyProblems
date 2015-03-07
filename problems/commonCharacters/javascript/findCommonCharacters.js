var _ = require('../../lib/node_modules/underscore/underscore.js');

module.exports = function (string1, string2){
  var result = [];
  var first = string1.split('');
  var second = string2.split('');


  for (var i=0; i<first.length; i++){
    if (first[i].test(/\w/) && result.indexOf(first[i]) === -1 && second.indexOf(first[i]) >= 0 ){
      result.push(first[i]);
    }
  }
  return result.join('');
};
