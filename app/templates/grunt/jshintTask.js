(function() {
  'use strict';
  module.exports = {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: [
      'server.js', 'public/app/app.js', 'public/app/**/*.js',
      'server/**/*.js'
    ],
    test: {
      options: {
        jshintrc: 'test/.jshintrc'
      },
      src: ['test/spec/{,*}*.js']
    }
  };
}());
