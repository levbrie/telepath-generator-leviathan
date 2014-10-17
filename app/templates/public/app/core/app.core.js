(function () {
  'use strict';
  angular.module('app.core', [
    /* angular modules */
    'ngResource', 'ngAnimate', 'ngRoute', 'ngSanitize',

    /* reusable core modules */
    'core.logger',

    /* 3rd party modules */
    'ui.bootstrap', 'satellizer', 'ngDialog', 'toastr'
  ]);
})();
