(function() {
  'use strict';
  module.exports = {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: [
      'app/**/*.js', 'generators/**/*.js'
    ],
    test: {
      options: {
        jshintrc: 'test/.jshintrc'
      },
      src: ['test/spec/{,*}*.js']
    }
  };
}());
