(function () {
  'use strict';

  var yeoman = require('yeoman-generator');

  var GulpGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
      console.log('You called the gulp subgenerator with the argument ' + this.name + '.');
    },

    files: function () {
      this.copy('somefile.js', 'somefile.js');
    }
  });

  module.exports = GulpGenerator;

})();
