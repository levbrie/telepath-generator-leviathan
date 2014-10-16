(function () {
  'use strict';
  var path    = require('path'),
      fs      = require('fs-extra'),
      shell   = require('shelljs'),
      process = require('child_process');

  module.exports = function(grunt) {
    var justInTimeStaticMappings = {};
    require('jit-grunt')(grunt, justInTimeStaticMappings);
    require('time-grunt')(grunt);

    var config = {
      pkg          : grunt.file.readJSON('package.json'),
      env          : process.env,
      jshint       : require('./grunt/jshintTask'),
      mochaTest: {
        test: {
          src: [
            'test/spec/*.js'
          ],
          options: {
            reporter: 'spec',
            colors: true,
            timeout: 120000
          }
        }
      }
    };
    grunt.initConfig(config);


    grunt.registerTask('updateFixtures', 'updates package and bower fixtures', function() {
      var done = this.async();
      var packageJson = fs.readFileSync(path.resolve('app/templates/_package.json'), 'utf8');
      var bowerJson = fs.readFileSync(path.resolve('app/templates/_bower.json'), 'utf8');

      // replace package name
      packageJson = packageJson.replace(/"name": "<%(.*)%>"/g, '"name": "tempApp"');
      packageJson = packageJson.replace(/<%(.*)%>/g, '');

      // remove all ejs conditionals
      bowerJson = bowerJson.replace(/"name": "<%(.*)%>"/g, '"name": "tempApp"');
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
      process.exec('npm install --quiet', {cwd: '../../fixtures'}, function (error, stdout, stderr) {

        grunt.log.ok('installing bower dependencies for generated app');
        process.exec('bower install', {cwd: '../../fixtures'}, function (error, stdout, stderr) {
          shell.cd('../../');
          done();
        })
      });
    });

    // "npm test" runs these tasks
    grunt.registerTask('test', [
      'jshint',
      'updateFixtures',
      'installFixtures',
      'mochaTest'
    ]);

    grunt.registerTask('default', function() {
      grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'))
      grunt.task.run([]); // add tasks to run by default here
    });
  };
})();
