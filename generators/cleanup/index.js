var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  init: function() {
    // this.log(Object.getPrototypeOf(this));
    this.generator = this;
  },
  cleanup: function() {
    // get the files and folders in cwd
    var expanded = this.dest.expand('*');
    this.log(expanded);

    this.log('\nDELETING FILES AND FOLDERS IN CWD...');

    expanded.forEach(function(file) {
      this.log(file);
      this.dest.delete(file);
    }.bind(this));
    // now get the dotfiles that remain in cwd
    var dotfiles = this.dest.expand('.*');
    this.log(dotfiles);
    this.log('\nDELETING DOTFILES IN CWD...');
    dotfiles.forEach(function(file) {
      this.log(file);
      this.dest.delete(file);
    }.bind(this));
  }
});