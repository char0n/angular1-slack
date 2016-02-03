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
      'vendor',

      'app.chat'
    ])
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
