(function() {
  'use strict';

  module.exports = {
    html: ['<%%= directories.dist %>/public/{,*/}*.html'],
    css: ['<%%= directories.dist %>/public/{,*/}*.css'],
    // js: ['<%%= directories.dist %>/public/{,*/}*.js'],
    options: {
      assetsDirs: [
        '<%%= directories.dist %>/public',
        '<%%= directories.dist %>/public/assets/images'
      ]
      // This is so we update image references in our ng-templates
      // (see angular-fullstack to do this)
    }
  };
})();
