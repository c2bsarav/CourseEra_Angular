(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirecting home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    //Setting UI different States
    $stateProvider
    //Home Page
    .state('home',{
      url:'/',
      templateUrl: 'src/templates/home.template.html'
    })

    //Categories page
    .state('categories', {
        url:'/categories',
        templateUrl: 'src/templates/categories.template.html',
        controller: 'MenuController as menu',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
    })

    .state('items',{
      url:'/items/{category}',
      templateUrl:'src/templates/items.template.html',
      controller: 'CategoryController as category',
      resolve: {
          items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.category);
          }]
      }
    });
  }
})();
