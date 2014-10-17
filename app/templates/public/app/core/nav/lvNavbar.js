(function () {
  'use strict';

  function lvNavbar () {

    function link(scope, element, attrs) {

    }

    return {
      restrict: 'E',
      templateUrl: '/partials/core/nav/navbar.html',
      link: link
    };

  }

  angular.module('app.core').directive('lvNavbar', lvNavbar);

})();
