'use strict';

var buildPrompts = {
  prompts: [{
    type    : 'list',
    name    : 'build',
    message : 'Would you like to use grunt or gulp for your build system?',
    choices : ['Grunt', 'Gulp'],
    default : 0,
    filter  : function(val) { return val.toLowerCase(); }
  }, {
    type    : 'list',
    name    : "stylesheet",
    default : 1,
    message : "Please select a preprocessor, or CSS if you prefer not to use one:",
    choices : [ "CSS", "Sass", "Stylus", "Less"],
    filter : function( val ) { return val.toLowerCase(); }
  }],
  prompt: function(generator) {
    var done = generator.async();
    var prompts = this.prompts;
    generator.prompt(prompts, function(properties) {
      generator.build = properties.build;
      generator.stylesheet = properties.stylesheet;
      generator.log('build prompt responses');
      generator.log(generator.build);
      generator.log(generator.stylesheet);
      done();
    }.bind(generator));
  }
};

module.exports = buildPrompts;
