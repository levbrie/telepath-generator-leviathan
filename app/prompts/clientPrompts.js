'use strict';
var yosay = require('yosay');

var clientPrompts = {
  prompts: [{
    type: 'checkbox',
    name: 'angularModules',
    message: 'Would you like to include any additional angular modules?',
    choices: [
      {
        value   : 'angular-animate',
        name    : 'angular-animate',
        checked : true
      },
      {
        value   : 'angular-resource',
        name    : 'angular-resource',
        checked : true
      },
      {
        value   : 'angular-cookies',
        name    : 'angular-cookies',
        checked : true
      },
      {
        value   : 'angular-mocks',
        name    : 'angular-mocks',
        checked : true
      },
      {
        value   : 'angular-sanitize',
        name    : 'angular-sanitize',
        checked : true
      }
    ]
  }],
  prompt: function(generator) {
    var done = generator.async();
    var prompts = this.prompts;

    generator.log(yosay('Now choose your client-side options'));
    generator.prompt(prompts, function(properties) {
      generator.angularModules = properties.angularModules;
      generator.log('client prompt responses');
      generator.log(generator.angularModules);
      done();
    }.bind(generator));
  }
};

module.exports = clientPrompts;
