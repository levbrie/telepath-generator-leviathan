(function () {
  'use strict';
  var SecretGenerator = {
    appSecret: function() {
      return createRandomString().toUpperCase();
    },
    tokenSecret: function() {
      return createRandomString();
    }
  }
  module.exports = SecretGenerator;
})();

function createRandomString(length, charsToUse) {

  var str = '';

  if (!length) { length = 20; }

  var chars = charsToUse || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

  for (var i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;

}
