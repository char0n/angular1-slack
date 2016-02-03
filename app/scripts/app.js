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
      .when('/', {
        templateUrl: 'scripts/chat/tpl/chat.tpl.html',
        controller: 'ChatController',
        controllerAs: 'chat'
      })
      .otherwise({
        redirectTo: '/'
      })
    ;
  }

  function configureMoment(moment) {
    moment.locale('en-gb');
  }
})();
