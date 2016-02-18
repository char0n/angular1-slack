(function() {
  'use strict';

  var upgradeAdapter = new ng.upgrade.UpgradeAdapter();
  angular.element(document.body).ready(function() {
    upgradeAdapter.bootstrap(document.body, ['app']);
  });

  angular
    .module('app', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngMaterial',
      'vendor',

      'app.chat'
    ])
    .constant('upgradeAdapter', upgradeAdapter)
    .config(configureRoutes)
    .run(configureMoment);

  function configureRoutes($routeProvider) {
    $routeProvider
      .when('/conversation', {
        template: '<conversation-detail flex layout="column" layout-fill />'
      })
      .otherwise({
        redirectTo: '/conversation'
      })
    ;
  }

  function configureMoment(moment) {
    moment.locale('en-gb');
  }
})();
