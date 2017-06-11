//https://podiatanapraia2.github.io/angular-coursera-course/module4-solution/#/
///index.html

<!DOCTYPE html>
<html ng-app='MenuApp'>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/styles.css">
    <title>Noodle Palace Menu</title>
  </head>
  <body>
    <h1>Welcome to Noodle Palace</h1>

    <ui-view></ui-view>

    <loading-spinner></loading-spinner>

    <!-- Libraries -->
    <script src="lib/angular.min.js"></script>
    <script src="lib/angular-ui-router.min.js"></script>

    <!-- Modules -->
    <script src="src/menuapp/menuapp.module.js"></script>
    <script src="src/data/data.module.js"></script>

    <!-- Routes -->
    <script src="src/routes.js"></script>

    <!-- 'MenuApp' module artifacts -->
    <script src="src/menuapp/categories.component.js"></script>
    <script src="src/menuapp/list-categories.controller.js"></script>
    <script src="src/menuapp/items.component.js"></script>
    <script src="src/menuapp/list-dishes.controller.js"></script>

    <!-- 'Data' module artifacts -->
    <script src="src/data/menudata.service.js"></script>

  </body>
</html>


//https://podiatanapraia2.github.io/angular-coursera-course/module4-solution/css/styles.css
.beside {
  float: left;
  margin-right: 100px;
}

// <script src="src/menuapp/menuapp.module.js"></script>
(function () {
'use strict';

angular.module('MenuApp', ['Data', 'ui.router']);

})();

// <script src="src/data/data.module.js"></script>
(function () {
'use strict';

angular.module('Data', []);

})();
// <!-- Routes -->
// <script src="src/routes.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })


  .state('listCategories', {
    url: '/listCategories',
    templateUrl: 'src/menuapp/templates/list-categories.template.html',
    controller: 'ListCategoriesController as catCtrl',
    resolve: {
      categoryList: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('listCategories.listDishes', {
    url: '/dishes/{catShortName}',
    templateUrl: 'src/menuapp/templates/list-dishes.template.html',
    controller: "ListDishesController as dishCtrl",
    resolve: {
      dishList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.catShortName);
      }]
    }
  });

}

})();

////'src/menuapp/templates/home.template.html'
<a ui-sref="listCategories">See our Menu Categories!</a>

///'src/menuapp/templates/list-categories.template.html',

<a ui-sref="home">Home</a> &lt; <span>Categories</span>

<h3>All Our Delicious Categories</h3>
<categories class="beside" categories-to-show="catCtrl.categoryList"></categories>

<ui-view class="beside"></ui-view>


///'src/menuapp/templates/list-dishes.template.html',

<items class="beside" dishes-to-show="dishCtrl.dishList.menu_items" category-name="dishCtrl.dishList.category.name"></items>


// <!-- 'MenuApp' module artifacts -->
// <script src="src/menuapp/categories.component.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/categories.template.html',
  bindings: {
    categoriesToShow: '<'
  }
});

})();
// <script src="src/menuapp/list-categories.controller.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.controller('ListCategoriesController', ListCategoriesController);


ListCategoriesController.$inject = ['categoryList'];
function ListCategoriesController(categoryList) {
  var ctrl = this;
  ctrl.categoryList = categoryList;
}

})();
// <script src="src/menuapp/items.component.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    dishesToShow: '<',
    categoryName: '<'
  }
});
})();
// <script src="src/menuapp/list-dishes.controller.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.controller('ListDishesController', ListDishesController);


ListDishesController.$inject = ['dishList'];
function ListDishesController(dishList) {
  var ctrl = this;
  ctrl.dishList = dishList;
}

})();
// <!-- 'Data' module artifacts -->
// <script src="src/data/menudata.service.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function () {
    return $http(
      {
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      })
      .then(function (result) {
        return result.data;
      });
  }

  service.getItemsForCategory = function (categoryShortName) {
    return $http(
      {
        url: "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName
      })
      .then(function (result) {
        return result.data;
      });
  }
}
})();
