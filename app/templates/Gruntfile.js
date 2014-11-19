(function () {
  // Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
  'use strict';

  module.exports = function(grunt) {
    var justInTimeStaticMappings = { // for plugins that can't be resolved in auto mapping
      protractor    : 'grunt-protractor-runner',
      express       : 'grunt-express-server',
      useminPrepare : 'grunt-usemin',
      cdnify        : 'grunt-google-cdn',
      ngtemplates   : 'grunt-angular-templates',
      changelog     : 'grunt-conventional-changelog'
    };
    require('jit-grunt')(grunt, justInTimeStaticMappings);    // just-in-time plugin loader (no more loadNpmTasks)
    require('time-grunt')(grunt);
    var config = {
      directories  : { client: 'public', dist: 'dist' },
      pkg          :   grunt.file.readJSON('package.json'),
      env          :   process.env,
      files        :   grunt.file.readJSON('./grunt/files.json'),
      express      :   require('./grunt/serve/expressTask'),
      open         :   require('./grunt/serve/openTask')('<%%= express.options.port %>'),

      /* PROCESSING */
      compass      :   require('./grunt/process/compassTask'),
      autoprefixer :   require('./grunt/process/autoprefixer'),

      /* WATCH */
      watch: {
        js         :   require('./grunt/watch/jsWatch'),
        css        :   require('./grunt/watch/cssWatch'),
        jsTest     :   require('./grunt/watch/jsTest'),
        livereload :   require('./grunt/watch/livereload'),
        express    :   require('./grunt/watch/express'),
        gruntfile  :   { files: ['Gruntfile.js'], tasks: ['reload'] },
        mochaTest  :   { files: ['server/**/*.spec.js'], tasks: ['test:server'] }
      },

      /* LINT */
      jshint       : require('./grunt/lint/jshintTask'),

      /* TEST*/
      karma        : require('./grunt/test/karmaTask'),
      protractor   : require('./grunt/test/protractorTask'),
      mochaTest    : require('./grunt/test/mochaTest'),

      /* INJECT REFS INTO index.html */
      wiredep      : require('./grunt/inject/wiredep'),
      injector     : require('./grunt/inject/injector'),

      /* TASK RUNNER OPTIMIZATION */
      concurrent   : require('./grunt/concurrent'),

      /* BUILD STEPS */
      clean        : require('./grunt/build/clean'),

      /* COMPRESS */
      cssmin       : require('./grunt/compress/cssmin'),
      imagemin     : require('./grunt/compress/imagemin'),
      svgmin       : require('./grunt/compress/svgmin'),

      /* REPLACE FILES WITH OPTIMIZED VERSIONS */
      useminPrepare: require('./grunt/build/useminPrepare'),
      usemin       : require('./grunt/build/usemin'),

      /* COPY REMAINING FILES TO .tmp/ FOR FURTHER USE */
      copy         : require('./grunt/build/copy'),

      /* CACHE / SERVE FROM CDN */
      rev          : require('./grunt/build/rev'),
      cdnify       : require('./grunt/build/cdnify'),

      /* ANGULAR */
      ngAnnotate   : require('./grunt/build/ngAnnotate'),
      ngtemplates  : require('./grunt/build/ngtemplates'),

      /* VERSION AND RELEASE */
      release      : require('./grunt/release/release'),
      changelog    : require('./grunt/release/changelog')
    };


    grunt.initConfig(config);
    grunt.registerTask('wait', function() {
      grunt.log.ok('Waiting for server reload...');
      var done = this.async();
      setTimeout(function() {
        grunt.log.writeln('Done waiting.');
        done();
      }, 1500);
    });
    grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
      this.async();
    });
    grunt.registerTask('serve', function (target) {
      if (target === 'prod') {
        return grunt.task.run([
          'build', 'express:prod', 'open', 'express-keepalive'
        ]);
      }
      process.env.NODE_ENV = 'development';
      grunt.log.ok(['NODE_ENV', process.env.NODE_ENV]);
      grunt.task.run(['express:dev', 'open', 'watch']);
    });
    grunt.registerTask('inject', ['wiredep', 'injector']);
    grunt.registerTask('test', function (target) {
      process.env.NODE_ENV = 'test';
      grunt.log.ok(['NODE_ENV', process.env.NODE_ENV]);
      if (target === 'server') {
        return grunt.task.run(['mochaTest']); // need some way to get test db
      } else if (target === 'client') {
        return grunt.task.run(['karma']);
      } else if (target === 'e2e') {
        return grunt.task.run(['protractor']);
      } else {
        grunt.task.run(['test:server', 'test:client']);
      }
    });
    grunt.registerTask('reload', function() {
      grunt.task.run(['wiredep', 'injector', 'newer:jshint', 'test:client']);
    });
    grunt.registerTask('bump', function(target) {
      var releaseWithTarget = 'release:' + target;
      grunt.task.run([releaseWithTarget, 'changelog']);
    });
    grunt.registerTask('build', [
      'clean:dist',
      'inject',
      'concurrent:build',
      'useminPrepare',
      'autoprefixer',
      'ngtemplates',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cdnify',
      'cssmin',
      'uglify',
      'rev',
      'usemin'
    ]);
    grunt.registerTask('default', function() {
      grunt.log.writeln('Author: ' + grunt.config.get('pkg.author'));
      grunt.task.run(['concurrent:dev1', 'concurrent:dev2', 'concurrent:dev3']);
      // grunt.task.run(['wiredep', 'injector', 'newer:jshint', 'test', 'serve']);
    });
  };
})();
