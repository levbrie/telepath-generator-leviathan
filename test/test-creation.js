/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('leviathan generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      var name = 'leviathan:app',
          dependencies = ['../../app'],
          args = ['ApplicationName'];
      this.app = helpers.createGenerator(name, dependencies, args);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('contains the app name in the README.md', function(done) {
    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      assert.fileContent('README.md', /Application Name/);
      done();
    });
  });

  it('contains the app name in the README.md', function(done) {
    helpers.mockPrompt(this.app, {});
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      assert.fileContent('package.json', /application-name/);
      done();
    });
  });
});
