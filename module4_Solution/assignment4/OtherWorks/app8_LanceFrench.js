///https://oldlance.github.io/coursera-angularjs/assignment-4/#/category-list/category/L

//index.html

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/styles.css">
        <title>Menu App</title>
    </head>

    <body ng-app="MenuApp">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1>Welcome to David's Restaurant's Menu App!</h1>
                        <ui-view></ui-view>
                        <loading-spinner></loading-spinner>
                </div>
            </div>
       </div>

        <!-- Libraries -->
        <script src="lib/angular.min.js"></script>
        <script src="lib/angular-ui-router.min.js"></script>

        <!-- Modules -->
        <script src="src/menuapp.module.js"></script>
        <script src="src/menudata.module.js"></script>

        <!-- Routes -->
        <script src="src/routes.js"></script>

        <!-- Menu App artifacts -->
        <script src="src/main-categories.controller.js"></script>
        <script src="src/categories.component.js"></script>
        <script src="src/items.component.js"></script>
        <script src="src/menudata.service.js"></script>
        <script src="src/items.controller.js"></script>

        <!-- Third party components - thanks Yaakov! -->
        <script src="src/spinner/spinner.module.js"></script>
        <script src="src/spinner/loadingspinner.component.js"></script>

    </body>
</html>


//Styles.css
body {
  font-size: 1.2em;
}

.loading-icon {
  position: absolute;
  left: 70%;
  top: 3px;
}

///https://oldlance.github.io/coursera-angularjs/assignment-4/src/menuapp.module.js
//<script src="src/menuapp.module.js"></script>
(function () {
    'use strict';

    // Declare the Menu App with its dependencies
    angular.module('MenuApp', ['ui.router', 'data', 'Spinner']);

})();

  // <script src="src/menudata.module.js"></script>
  (function () {
      'use strict';

      angular.module('data', []);

  })();
  // <!-- Routes -->
  // <script src="src/routes.js"></script>
  (function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page is unrecognised route encountered
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            })
            .state('categoryList', {
                url: '/category-list',
                templateUrl: 'src/templates/main-categories.template.html',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                },
                controller: 'MainCategoriesController as mainList'
            })
            .state('categoryList.items', {
                url: '/category/{categoryId}',
                templateUrl: 'src/templates/items.template.html',
                resolve: {
                    items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryId);
                    }]
                },
                controller: 'ItemsController as childList'
            });
    }


})();

//'src/templates/home.template.html'
<button class="btn btn-lg btn-primary" ui-sref="categoryList">View menu categories</button>
//'src/templates/main-categories.template.html'

<div class="row">
    <ol class="breadcrumb">
        <li><a ui-sref="home" >Home</a></li>
        <li class="active">Categories</li>
    </ol>
</div>
<div class="col-md-4">
    <categories categories="mainList.categories"></categories>
</div>
<div class="col-md-6">
    <ui-view></ui-view>
</div>
//'src/templates/items.template.html'

<h3>{{childList.categoryName}} Menu</h3>
<div ng-if="childList.specialInstructions">
    <p class="bg-info">{{childList.specialInstructions}}</p>
</div>
<ul>
    <li  ng-repeat="item in childList.items">
        {{item.name}}
    </li>
</ul>

  // <!-- Menu App artifacts -->
  // <script src="src/main-categories.controller.js"></script>
  (function() {
      'use strict';

      angular
          .module('MenuApp')
          .controller('MainCategoriesController', MainCategoriesController);

      MainCategoriesController.$inject = ['$rootScope', 'categories'];
      function MainCategoriesController($rootScope, categories) {
          var  self = this;
          var cancellers = [];

          self.categories = categories;

          self.$onInit = function () {
              var cancel = $rootScope.$on('$stateChangeStart',
                  function(event, toState, toParams, fromState, fromParams, options){
                      self.showSpinner = true;
                  });
              cancellers.push(cancel);

              cancel = $rootScope.$on('$stateChangeSuccess',
                  function(event, toState, toParams, fromState, fromParams){
                      self.showSpinner = false;
                  });
              cancellers.push(cancel);

              cancel = $rootScope.$on('$stateChangeError',
                  function(event, toState, toParams, fromState, fromParams, error){
                      self.showSpinner = false;
                  });
              cancellers.push(cancel);
          };

      self.$onDestroy = function () {
          cancellers.forEach(function (item) {
              item();
          });
      };

      }
  })();

  // <script src="src/categories.component.js"></script>

  (function() {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'src/templates/categories.template.html',
            bindings: {
                categories: '<'
            }
        });

})();
  // <script src="src/items.component.js"></script>
  (function() {
    'use strict';
    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'src/templates/items.template.html',
            bindings: {
                items: '<'
            }
        });

})();
  // <script src="src/menudata.service.js"></script>
  (function() {
'use strict'

angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBaseUrl', 'https://davids-restaurant.herokuapp.com');


MenuDataService.$inject = ['$http', 'ApiBaseUrl'];
function MenuDataService($http, ApiBaseUrl) {
    var service = this;

    service.getAllCategories = function() {
        return $http(
            {
              method: 'GET',
              url: (ApiBaseUrl + '/categories.json')
            }).then(function(response) {
                return response.data;
            }).catch(function(response) {
                console.error("Error in getAllCategories(): ", response);
            });
    };

    service.getItemsForCategory = function(categoryShortName) {
        return $http(
            {
                method: 'GET',
                url: (ApiBaseUrl + '/menu_items.json'),
                params: { category: categoryShortName}
            }).then(function(response) {
                return response.data;
            }).catch(function(response) {
                console.error("Error in getItemsForCateory(): ", response);
            });
    }
};

})();
  // <script src="src/items.controller.js"></script>
  (function() {
      'use strict';

      angular
          .module('MenuApp')
          .controller('ItemsController', ItemsController);

      ItemsController.$inject = ['items'];
      function ItemsController(items) {
          var self = this;
          var category = items.category;

          self.categoryName = category.name;
          self.specialInstructions = category.special_instructions;
          self.items = items.menu_items;
      }
  })();
  // <!-- Third party components - thanks Yaakov! -->
  // <script src="src/spinner/spinner.module.js"></script>
  (function () {
'use strict';

angular.module('Spinner', []);

})();
  // <script src="src/spinner/loadingspinner.component.js"></script>
  (function () {
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner', {
    templateUrl: 'src/spinner/loadingspinner.template.html',
    controller: SpinnerController
  });


  SpinnerController.$inject = ['$rootScope']
  function SpinnerController($rootScope) {
    var $ctrl = this;
    var cancellers = [];

    $ctrl.$onInit = function () {
      var cancel = $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
        $ctrl.showSpinner = true;
      });
      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);
    };

    $ctrl.$onDestroy = function () {
      cancellers.forEach(function (item) {
        item();
      });
    };

  };

  })();
