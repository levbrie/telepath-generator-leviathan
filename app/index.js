'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var leviathanLion = require('../leviathan_say/leviathan-lion');
var buildPrompts = require('./prompts/buildPrompts');
var clientPrompts = require('./prompts/clientPrompts');


var LeviathanGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  welcome: function() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Leviathan generator!'));
    this.log(leviathanLion('WELCOME TO THE LEVIATHAN'));
  },

  buildPrompts: function () {
    buildPrompts.prompt(this); // pass in generator to buildPrompts module
  },

  clientPrompts: function () {
    clientPrompts.prompt(this);
  },

  dirStructure: function () {
    this.mkdir('server');
    this.mkdir('client');
    this.mkdir('client/app');
    this.mkdir('client/stylesheets');
    this.mkdir('test');
    this.mkdir('grunt');
    this.mkdir('dist');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = LeviathanGenerator;
