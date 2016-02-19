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
      'appState',
      'components',

      'app.chat',
      'app.people',
      'app.calendar',
      'app.todo'
    ])
    .constant('upgradeAdapter', upgradeAdapter)
    .config(configureRoutes)
    .run(configureMoment);

  function configureRoutes($routeProvider) {
    $routeProvider
      .when('/conversation', {
        template: '<tz-conversation-detail flex layout="column" layout-fill />'
      })
      .when('/calendar', {
        template: '<tz-calendar />'
      })
      .when('/people', {
        template: '<tz-people />'
      })
      .when('/todo', {
        template: '<tz-todo />'
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
