(function() {
  'use strict';

  angular
    .module('app', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngMaterial',

      'app.chat'
    ])
    .config(configureRoutes);

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
})();
