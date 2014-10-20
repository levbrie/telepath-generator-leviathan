(function() {
  'use strict';
  module.exports = {
    test: {
      src: [
        'test/spec/*.spec.js',
        'test/spec/test-creation.js',
        'test/spec/test-load.js',
        'test/spec/test-cleanup.js'
      ],
      options: {
        reporter: 'spec',
        colors: true,
        timeout: 120000
      }
    }
  };
}());
