(function () {
  'use strict';

  module.exports = function(grunt) {
    var justInTimeStaticMappings = {};
    require('jit-grunt')(grunt, justInTimeStaticMappings);
    require('time-grunt')(grunt);

    var config = {
      pkg      : grunt.file.readJSON('package.json'),
      env      : process.env
    };
    grunt.initConfig(config);
    grunt.registerTask('default', function() {
      grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'))
      grunt.task.run([]); // add tasks to run by default here
    });
  };
})();
