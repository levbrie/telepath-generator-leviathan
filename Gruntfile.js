(function () {
  'use strict';
  var path    = require('path'),
      fs      = require('fs-extra'),
      shell   = require('shelljs'),
      process = require('child_process'),
      semver  = require('semver'),
      Q       = require('q');

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


    grunt.registerTask('addchangelog', 'create changelog', function() {
      var nowrite = grunt.option('no-write'),
          commitMessage = 'chore(CHANGELOG.md): add changelog for new release',
          done = this.async();
      Q()
        .then(addChangelog)
        .then(commitChangelog)
        .catch(function(msg) {
          grunt.fail.warn(msg || 'autorelease failed');
        })
        .finally(done);

      function run(cmd, msg){
        var deferred = Q.defer();
        grunt.verbose.writeln('Running: ' + cmd);

        if (nowrite) {
          grunt.log.ok(msg || cmd);
          deferred.resolve();
        }
        else {
          var success = shell.exec(cmd, {silent:true}).code === 0;

          if (success){
            grunt.log.ok(msg || cmd);
            deferred.resolve();
          }
          else{
            // fail and stop execution of further tasks
            deferred.reject('Failed when executing: `' + cmd + '`\n');
          }
        }
        return deferred.promise;
      }
      function addChangelog(){
        return run('git add CHANGELOG.md', ' staged CHANGELOG.md');
      }
      function commitChangelog(){
        return run('git commit CHANGELOG.md -m "'+ commitMessage +'"', 'committed CHANGELOG.md');
      }
    });
    grunt.registerTask('autorelease', 'create a new release', function(type) {
      var bumpWithType = 'bump:' + type,
          releaseWithType = 'release:' + type;

      grunt.task.run(['changelog', 'addchangelog', releaseWithType]);
    });
    grunt.registerTask('bump', 'bump repo version', function (type) {
      var options = this.options({
        file: grunt.config('pkgFile') || 'package.json'
      });

      function setup(file, type) {
        var pkg = grunt.file.readJSON(file);
        var newVersion = pkg.version = semver.inc(pkg.version, type || 'patch');
        return {
          file: file,
          pkg: pkg,
          newVersion: newVersion
        };
      }

      var config = setup(options.file, type);
      grunt.file.write(config.file, JSON.stringify(config.pkg, null, '  ') + '\n');
      grunt.log.ok('Version bumped to ' + config.newVersion);
    });



    grunt.registerTask('default', function() {
      grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'))
      grunt.task.run([]); // add tasks to run by default here
    });
  };
})();
