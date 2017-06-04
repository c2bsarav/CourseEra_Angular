//index.html .////https://linneabenoit.github.io/Angular1/four/index.html#!/

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
  <link rel="stylesheet" href="css/styles.css">
  <title>Intro to ui-router</title>
</head>
<body ng-app="MenuApp">
  <header>
    <h1>Welcome to our Restaurant!</h1>
  </header>
  <main>
    <ui-view></ui-view>

    <!-- Libraries -->
    <script src="lib/angular.min.js"></script>
    <script src="lib/angular-ui-router.min.js"></script>

    <!-- Modules -->
		<script src="src/data.module.js"></script>
    <script src="src/menuApp.module.js"></script>

    <!-- Config -->
    <script src="src/routes.config.js"></script>

    <!-- 'MenuApp' module artifacts -->
    <script src="src/categories.component.js"></script>
    <script src="src/categories.controller.js"></script>
		<script src="src/items.controller.js"></script>
    <script src="src/menuApp.service.js"></script>
		<script src="src/menudata.service.js"></script>

  </main>
</body>
</html>
/////styles.css
h1 {
  margin-bottom: 30px;
}
button {
  margin-top: 10px;
}
a.activeItem {
  font-weight: bold;
}
a.hover {
    font-weight: bold;
}


//src/data.module.js
(function () {
  'use strict';
   angular.module('DataModule', []);
})();

//src/menuApp.module.js
(function () {
  'use strict';
   angular.module('MenuApp', ['ui.router', 'DataModule']);
})();

///////<script src="src/routes.config.js"></script>
(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig ($stateProvider, $urlRouterProvider) {
      // Redirect to tab 1 if no other URL matches
      $urlRouterProvider.otherwise('/');

      // Set up UI states
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'src/templates/home.html',

        })

        .state('categories', {
          url: '/categories',
          templateUrl: 'src/templates/categories.html',
          controller: 'CategoriesCtrl as categoriesCtrl',
          resolve: {
            myData:['MenuDataService', function(MenuDataService) {
              return MenuDataService.getAllCategories();
            }]
          }
        })

        .state('items', {
          url: '/items/{categoryShortName}',
          templateUrl: 'src/templates/items.html',
          controller: 'ItemsCtrl as itemsCtrl',
          resolve: {
            myData:['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
          }
        });
    }

  })();

////src/categories.component.js
(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categoriesComponent', categoriesComponent);

  function categoriesComponent() {
      var component = {
        templateURL: 'src/templates/categories.html',
        bindings: {
          categories: '<'
        },
        controller: CategoriesCtrl,
    		controllerAs: 'categoriesCtrl',
    		bindToController: true
        };

      return component;
    };

})();

//<script src="src/categories.controller.js"></script>
(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoriesCtrl', CategoriesCtrl);

  CategoriesCtrl.$inject = ['MenuDataService', 'myData'];
  function CategoriesCtrl(MenuDataService, myData) {
    var categoriesCtrl = this;

    categoriesCtrl.categories = myData;
  }
})();

//<script src="src/items.controller.js"></script>
(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsCtrl', ItemsCtrl);

  ItemsCtrl.$inject = ['MenuDataService', 'myData'];
  function ItemsCtrl(MenuDataService, myData) {
    var itemsCtrl = this;

    itemsCtrl.items = myData;
  }

})();
//<script src="src/menuApp.service.js"></script>
//<script src="src/menudata.service.js"></script>
(function () {
  'use strict';

  angular.module('DataModule')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', '$q'];
  function MenuDataService($http, $q) {
    var service = this;

    service.getAllCategories = function() {
      var myCategories = [];

      var promise = getResponseObjects()
      .then(function(response) {
        for (var i = 0; i < response.length; i++) {
          myCategories.push({
            name: response[i].name,
            short_name: response[i].short_name
          });
        };

        return myCategories;
      })
      .catch(function(response) {
        console.log("something wrong!");

        return myCategories;
      });

      return promise;
    }

    service.getItemsForCategory = function(categoryShortName) {
      var items = [];

      var promise = getItemsResponseObjects(categoryShortName)
      .then(function(response) {
        var menuItemsArray = response.menu_items;
        for (var i = 0; i < menuItemsArray.length; i++) {

          items.push(menuItemsArray[i].name);
        };

        return items;
      })
      .catch(function(response) {
        console.log("something wrong!");

        return items;
      });

      return promise;
    }

    function getResponseObjects() {
      var httpPromise = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      });

      return httpPromise.then(function(response) {
        return response.data;
      }, function(errorResponse) {
        return response.data;
      });
    }

    function getItemsResponseObjects(categoryShortName) {
      var uRL = "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName;
      var httpPromise = $http({
        method: "GET",
        url: uRL
      });

      return httpPromise.then(function(response) {
        return response.data;
      }, function(errorResponse) {
        return response.data;
      });
    }

  }
})();
