// Sass Transcompilation Task
(function() {
  'use strict';
  module.exports = {
    files: ['test/specs/{,*//*}*.js', 'test/specs/**/{,*//*}*.js'],
    tasks: ['jshint:test', 'karma']
  };
}());
