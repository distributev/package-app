'use strict';

angular.module('angularFullstackApp', ['angularFullstackApp.auth', 'angularFullstackApp.admin',
    'angularFullstackApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
    'ui.router', 'ui.bootstrap', 'validation.match', 'Menus'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(['menuService','Auth','$timeout','$rootScope',
    function(menuService) {
      menuService.addMenu('nav', {
        roles: ['user']
      });

      menuService.addMenuItem('nav', {
        title: 'Customers',
        state: 'customers',
        type: 'dropdown',
        roles: ['user'],
        class: 'fa fa-dashboard'
      });

      menuService.addMenuItem('nav', {
        title: 'Transactions',
        state: 'transactions',
        type: 'dropdown',
        roles: ['user'],
        class: 'fa fa-files-o'
      });

    }]);
