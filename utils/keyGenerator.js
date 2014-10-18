(function () {
  'use strict';
  var KeyGenerator = {
    appSecret: function() {
      return createRandomString().toUpperCase();
    },
    tokenSecret: function() {
      return createRandomString();
    }
  }

  function createRandomString(length, charsToUse) {
    var str = '';
    var chars = charsToUse || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

    if (!length) { length = 20; }
    for (var i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  }

  module.exports = KeyGenerator;
})();
