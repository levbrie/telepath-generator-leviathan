(function () {
  'use strict';
  var path    = require('path'),
      fs      = require('fs-extra'),
      shell   = require('shelljs'),
      process = require('child_process');

  module.exports = function(grunt) {
    var justInTimeStaticMappings = {
      changelog: 'grunt-conventional-changelog'
    };
    require('jit-grunt')(grunt, justInTimeStaticMappings);
    require('time-grunt')(grunt);

    var config = {
      pkg          : grunt.file.readJSON('package.json'),
      env          : process.env,
      jshint       : require('./grunt/jshintTask'),
      testApp      : { name: 'testAppName' },
      mochaTest    : require('./grunt/mochaTest'),
      release      : require('./grunt/release'),
      changelog    : require('./grunt/changelog')
    };
    grunt.initConfig(config);


    grunt.registerTask('updateFixtures', 'updates package and bower fixtures', function() {
      var done = this.async();
      var appName = grunt.config('testApp.name');

      var packageJson = fs.readFileSync(path.resolve('app/templates/_package.json'), 'utf8');
      var bowerJson = fs.readFileSync(path.resolve('app/templates/_bower.json'), 'utf8');

      // replace package name
      packageJson = packageJson.replace(/"name"(\s+): "<%(.*)%>"/g, '"name": "' + appName + '"');
      packageJson = packageJson.replace(/<%(.*)%>/g, '');

      // remove all ejs conditionals
      bowerJson = bowerJson.replace(/"name": "<%(.*)%>"/g, '"name": "' + appName + '"');
      bowerJson = bowerJson.replace(/<%(.*)%>/g, '');

      // save files
      fs.writeFile(path.resolve(__dirname + '/test/fixtures/package.json'), packageJson, function() {
        fs.writeFile(path.resolve(__dirname + '/test/fixtures/bower.json'), bowerJson, function() {
          done();
        });
      });
    });

    grunt.registerTask('installFixtures', 'install package and bower fixtures', function() {
      var done = this.async();


      shell.cd('test/fixtures');
      grunt.log.ok('installing npm dependencies for generated app');
      process.exec('bower install', {cwd: '../fixtures'}, function (error, stdout, stderr) {
        process.exec('npm install --quiet', {cwd: '../fixtures'}, function (error, stdout, stderr) {

        grunt.log.ok('installing bower dependencies for generated app');

          shell.cd('../../');
          grunt.log.ok('FINISHED INSTALLING BOWER DEP');
          done();
        })
      });
    });

    // "npm test" runs these tasks
    grunt.registerTask('test', function(target) {
      if (target === 'build') {
        return grunt.task.run([
          // update and/or install fixtures
          'jshint', 'updateFixtures', 'installFixtures', 'mochaTest'
        ]);
      }
      grunt.task.run(['jshint', 'mochaTest']);
    });

    grunt.registerTask('bump', function(target) {
      var releaseWithTarget = 'release:' + target;
      grunt.task.run([releaseWithTarget, 'changelog']);
    });

    grunt.registerTask('default', function() {
      grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'))
      grunt.task.run([]); // add tasks to run by default here
    });
  };
})();
