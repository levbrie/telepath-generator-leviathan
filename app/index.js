(function () {
  'use strict';

  var path                    = require('path'),
      yeoman                  = require('yeoman-generator'),
      yosay                   = require('yosay'),
      // util = require('util'),
      // chalk = require('chalk'),
      leviathanLion           = require('../leviathan_say/leviathan-lion'),
      buildPrompts            = require('./prompts/buildPrompts'),
      clientPrompts           = require('./prompts/clientPrompts'),
      externalServicesPrompts = require('./prompts/externalServicesPrompts'),
      keyGenerator            = require('../utils/keyGenerator');


  var LeviathanGenerator = yeoman.generators.Base.extend({
    init: function () {
      this.argument('name', { type: String, required: false });
      this.appname = this.name || path.basename(process.cwd());
      this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
      this.scriptAppName = this.appname;
      this.appSecret = keyGenerator.appSecret();
      this.tokenSecret = keyGenerator.tokenSecret();
      this.log('APP_SECRET: ' + this.appSecret);
      this.log('TOKEN_SECRET: ' + this.tokenSecret);
      this.pkg = require('../package.json');
      this.filters = {};


      // this.on('end', function () {
      //   if (!this.options['skip-install']) {
      //     this.installDependencies();
      //   }
      // });
    },

    welcome: function() {
      // Have Yeoman greet the user.
      // this.log(yosay('Welcome to the marvelous Leviathan generator!'));
      this.log(leviathanLion('WELCOME TO THE LEVIATHAN'));
      this.log('This generator creates an an AngularJS app with ' +
               ' an express server and a MongoDB data store.');
    },

    buildPrompts: function () {
      buildPrompts.prompt(this); // pass in generator to buildPrompts module
    },

    clientPrompts: function () {
      clientPrompts.prompt(this);
    },

    externalServicesPrompts: function () {
      externalServicesPrompts.prompt(this);
    },

    saveSettings: function() {
      this.config.set('filters', this.filters);
      this.config.forceSave(); // make sure saving is done b4 calling hook
    },

    configuring: function () {
      // this.copy('editorconfig', '.editorconfig');
      // this.copy('jshintrc', '.jshintrc');
    },

    writing: function () {
      this.mkdir('server');
      this.mkdir('public');
      this.mkdir('public/app');
      this.mkdir('public/stylesheets');
      this.mkdir('test');
      this.mkdir('grunt');
      this.mkdir('dist');

      this.log('APP NAME:');
      this.log(this.appname);
      // templates
      // var context = {
      //     appname: this.appname
      // };
      this.log(this.sourceRoot());
      this.log(this.destinationRoot());
      this._processDirectory(this.sourceRoot(), this.destinationRoot());
    },

    // install: function () {
    //   this.installDependencies({
    //     skipInstall: this.options['skip-install']
    //   });

    //   this.on('end', function() {
    //     this.spawnCommand('grunt', ['compass']);
    //   });
    // }
    install: function() {
      this.on('end', function () {
        this.installDependencies({
          skipInstall: this.options['skip-install'],
          callback: function() {
            // Emit a new event - dependencies installed
            this.emit('dependenciesInstalled');
          }.bind(this)
        });
      });

      // Now you can bind to the dependencies installed event
      this.on('dependenciesInstalled', function() {
        this.spawnCommand('grunt', ['compass'], this._gruntFailedCallback)
          .on('error', this._gruntFailedCallback)
          .on('exit', this.emit.bind(this, 'gruntCompassComplete')); // generate style.css
      });

      this.on('gruntCompassComplete', function() {
        // this.spawnCommand('git', ['init'])
        //   .on('exit', this.emit.bind(this, 'gitInitComplete'));
        this.spawnCommand('hub', ['init'])
          .on('exit', this.emit.bind(this, 'initComplete'));
      });

      //  hub init
      // $ hub add . && hub commit -m "initial commit"
      // $ hub create optional_org_name/repo_name -d "description of repo"
      // $ hub push origin master

      this.on('initComplete', function() {
        this.spawnCommand('hub', ['add', '.'])
          .on('exit', this.emit.bind(this, 'hubAddComplete'));
      });

      this.on('hubAddComplete', function() {
        this.spawnCommand('hub', ['commit', '-m', 'initial commit'])
          .on('exit', this.emit.bind(this, 'hubCommitComplete'));
      });

      this.on('hubCommitComplete', function() {
        this.spawnCommand('hub', ['create', '-d', 'Fullstack application using MEAN.'])
          .on('exit', this.emit.bind(this, 'hubCreateComplete'));
      });

      this.on('hubCreateComplete', function() {
        this.spawnCommand('hub', ['push', 'origin', 'master']);
      });
      // this.on('gitInitComplete', )

      // this.spawnCommand(installer, args, cb)
      //   .on('error', cb)
      //   .on('exit', this.emit.bind(this, installer + 'Install:end', paths))
      //   .on('exit', function (err) {
      //     if (err === 127) {
      //       this.log.error('Could not find ' + installer + '. Please install with ' +
      //                           '`npm install -g ' + installer + '`.');
      //     }
      //     cb(err);
      //   }.bind(this));
    },

    _gruntFailedCallback: function() {
      this.log('GRUNT COMPASS TASK FAILED');
    }

  });

  LeviathanGenerator.prototype._processDirectory = function(source, destination) {
      var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
      var files = this.expandFiles('**', { dot: true, cwd: root });
      this.log(files);
      for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var src = path.join(root, f);
          var dest;
          if(path.basename(f).indexOf('_') === 0){
              dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
              this.template(src, dest);
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

})();
