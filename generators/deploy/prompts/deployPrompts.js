(function () {
  'use strict';
  var chalk = require('chalk');

  var deployPrompts = {
    prompts: [{
      name: 'repoName',
      message: 'Please enter the name of the repository you wish to ' +
               'create on Github (defaults to current directory). To ' +
               'create a repo within an organization you belong to, ' +
               'simply include create a name in the format ' +
               'ORGANIZATION_NAME/REPO_NAME.'
    }, {
      type: 'confirm',
      name: 'makePrivate',
      message: 'Do you wish to make this a private repo? (y/N)',
      default: false
    }, {
      name: 'herokuAppName',
      message: 'Name to use for heroku deployment (leave blank for a randomly generated name)'
    }, {
      type: 'confirm',
      name: 'useMongoLabAddOn',
      message: 'Do you wish to use the heroku mongolab addon to add mongo directly to heroku?',
      default: true
    }],
    prompt: function(generator) {
      var done = generator.async();
      var prompts = this.prompts;

      generator.log(chalk.bold.yellow('Deployment Setup:'));
      generator.prompt(prompts, function(deployResponses) {
        generator.repoName = generator._.slugify(deployResponses.repoName) || generator._.slugify(generator.appname);
        generator.makePrivate = deployResponses.makePrivate;
        generator.herokuAppName = generator._.slugify(deployResponses.herokuAppName);
        generator.useMongoLabAddOn = deployResponses.useMongoLabAddOn;

        done();
      }.bind(generator));
    }
  };

  module.exports = deployPrompts;

})();
