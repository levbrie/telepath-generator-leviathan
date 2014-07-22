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
    this.argument('name', { type: String, required: false });
    this.appName = this.name || path.basename(process.cwd());
    this.appName = this._.camelize(this._.slugify(this._.humanize(this.appName)));
    this.pkg = require('../package.json');


    // this.on('end', function () {
    //   if (!this.options['skip-install']) {
    //     this.installDependencies();
    //   }
    // });
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

  configuring: function () {
    // this.copy('editorconfig', '.editorconfig');
    // this.copy('jshintrc', '.jshintrc');
  },

  writing: function () {
    this.mkdir('server');
    this.mkdir('client');
    this.mkdir('client/app');
    this.mkdir('client/stylesheets');
    this.mkdir('test');
    this.mkdir('grunt');
    this.mkdir('dist');

    // copy
    // this.copy('_bower.json', 'bower.json');

    this.log('APP NAME:');
    this.log(this.appName);
    // templates
    var context = {
        app_name: this.appName
    };
    this.log(this.sourceRoot());
    this.log(this.destinationRoot());
    this._processDirectory(this.sourceRoot(), this.destinationRoot(), context);

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }


});

LeviathanGenerator.prototype._processDirectory = function(source, destination, context) {
    var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
    var files = this.expandFiles('**', { dot: true, cwd: root });
    this.log(files);
    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        var src = path.join(root, f);
        var dest;
        if(path.basename(f).indexOf('_') == 0){
            dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
            this.template(src, dest, context);
            this.log('creating template from: ' + src);
        }
        else{
          if(path.basename(f).indexOf('.') < 0) {
            // it's a dotfile
            this.log('\n\n CREATING DOTFILE');
            f = '.' + f;
            dest = path.join(destination, f);
            this.log(dest);
          } else {
            dest = path.join(destination, f);
          }
          this.copy(src, dest);
          this.log('creating copy from: ' + src);
          this.log('creating copy to:   ' + dest);
        }
    }
};

module.exports = LeviathanGenerator;
