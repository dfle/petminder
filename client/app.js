angular.module('app', ['ui.router', 'app-main', 'app-history', 'app-main-factory', 'app-walk-factory'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('walks', {
      url: '/walks',
      templateUrl: './walks/walks.html',
      controller: 'walkController as vm'
    })
    .state('main', {
      url: '/main',
      templateUrl: './main/main.html',
      controller: 'MainController as vm'
    })
    .state('home', {
      url: '/',
      templateUrl: './home/home.html'
    });
  $urlRouterProvider.otherwise('/');
});
