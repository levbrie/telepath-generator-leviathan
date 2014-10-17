(function() {
  'use strict';

  module.exports = {
    options: {},
    scripts: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/public/', '');
          return '<script src="' + filePath + '"></script>';
        },
        starttag: '<!-- injector:js -->',
        endtag: '<!-- endinjector -->'
      },
      files: {
        'public/index.html': ['public/app/**/*.js']
      }
    }
  };
}());
