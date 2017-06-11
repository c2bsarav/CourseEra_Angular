view-source:https://irinasutyagina.github.io/coursera-test/module4-solution/#/
///Index.html
<!DOCTYPE html>
<html ng-app='MenuApp'>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/styles.css">
    <title>Restaurant menu</title>
  </head>
  <body>
    <h1>Welcome to our Restaurant</h1>
    <ui-view></ui-view>


    <!-- Libraries -->
    <script src="lib/angular.min.js"></script>
    <script src="lib/angular-ui-router.min.js"></script>

    <!-- Modules -->
    <script src="src1/menu/menuapp.module.js"></script>

    <!-- Routes -->
    <script src="src1/routes.js"></script>

    <!-- 'ShoppingList' module artifacts -->
    <script src="src1/menu/categorylist.component.js"></script>
    <script src="src1/menu/main-menu.controller.js"></script>
    <script src="src1/menu/category-detail.controller.js"></script>
    <script src="src1/menu/menudata.service.js"></script>

  </body>
</html>

//Styles.css
body {
  font-size: 1.2em;
}

.error {
  color: red;
  font-weight: bold;
  display: none;
}

.loading-icon {
  position: absolute;
  left: 50%;
  top: 10px;
}

li[ui-sref]:hover {
  display: inline-block;
  cursor: pointer;
  border: solid black 1px;
  padding-left: 5px;
  padding-right: 5px;
}


// <script src="src1/menu/menuapp.module.js"></script>
(function () {
'use strict';

angular.module('MenuApp', ['ui.router']);

})();
// <!-- Routes -->
// <script src="src1/routes.js"></script>
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
    templateUrl: 'src1/menu/templates/home.template.html'
  })

  // Premade list page
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src1/menu/templates/main-menu.template.html',
    controller: 'MainShoppingListController as mainList',
    resolve: {
      items: ['MenudataService', function (MenudataService) {
        return MenudataService.getItems();
      }]
    }
  })

    .state('categoryList.categoryDetail', {
    url: '/category-detail/{itemId}',
    templateUrl: 'src1/menu/templates/category-detail.template.html',
    controller: "CategoryDetailController as categoryDetail"

  });

}

})();
// <!-- 'ShoppingList' module artifacts -->
// <script src="src1/menu/categorylist.component.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src1/menu/templates/categorylist.template.html',
  bindings: {
    items: '<'
  }
});

})();
// <script src="src1/menu/main-menu.controller.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.controller('MainShoppingListController', MainShoppingListController);


// MainShoppingListController.$inject = ['ShoppingListService'];
// function MainShoppingListController(ShoppingListService) {
MainShoppingListController.$inject = ['items'];
function MainShoppingListController(items) {
  var mainList = this;
  mainList.items = items;

  // mainList.$onInit = function () {
  //   ShoppingListService.getItems()
  //   .then(function (result) {
  //     mainList.items = result;
  //   });
  // };
}

})();
// <script src="src1/menu/category-detail.controller.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryDetailController', CategoryDetailController);


CategoryDetailController.$inject = ['$stateParams', 'items','MenudataService'];
function CategoryDetailController($stateParams, items, MenudataService) {
  var categoryDetail = this;
  var item = items[$stateParams.itemId];
  categoryDetail.items = [];
  console.log("Selected category ID" + $stateParams.itemId);
  var categoryShortName = $stateParams.itemId;
  // categoryDetail.items = function (){
  //  return MenudataService.getCategoryItems("L");
  // }


  var promise = MenudataService.getCategoryItems($stateParams.itemId);

  promise.then(function (response) {
    categoryDetail.items = response.data.menu_items;
    console.log(response.data)
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

console.log(categoryDetail.items);
//   itemDetail.name = item.name;
//   itemDetail.quantity = item.quantity;
//   itemDetail.description = item.description;
}

})();
// <script src="src1/menu/menudata.service.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.service('MenudataService', MenudataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenudataService.$inject = ['$q', '$http', 'ApiBasePath']
function MenudataService($q, $http, ApiBasePath) {
  var service = this;

  // List of shopping items
  var items = [];

  // Pre-populate a no cookie list
  items.push({
    name: "Sugar",
    quantity: "2 bags",
    description: "Sugar used for baking delicious umm... baked goods."
  });
  items.push({
    name: "flour",
    quantity: "1 bags",
    description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
  });
  items.push({
    name: "Chocolate Chips",
    quantity: "3 bags",
    description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
  });

  // Simulates call to server
  // Returns a promise, NOT items array directly
  // service.getItems = function () {
  //   return items;
  // };

  service.getItems = function () {
    return $http(
      {
        method: "GET",
        url: (ApiBasePath + "/categories.json"),
      }).then(function (result) {
        // process result and only keep items that match
        var foundItems = new Array();
        foundItems = result.data;
        console.log(result.data);
        return foundItems;
      });
  };

// //     service.getCategoryItems = function (shortName) {
//       return $http(
//         {
//           method: "GET",
//           url: (ApiBasePath + "/menu_items.json"),
//           params: {
//             category: shortName
//           }
//         }).then(function (result) {
//         // process result and only keep items that match
//         var foundItems = new Array();
//         foundItems = result.data;
//         console.log("Found in service: " + result.data);
//         return foundItems;
//       })
//       .catch(function (error) {
//     console.log("Something went terribly wrong.");
//   });
// };

  service.getCategoryItems = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();


////view-source:https://irinasutyagina.github.io/coursera-test/module4-solution/src1/menu/templates/categorylist.template.html
//categorylist.template.html
<ul>
  <li ng-repeat="item in $ctrl.items" ui-sref="categoryList.categoryDetail({itemId: item.short_name})">
    {{ item.name }}
  </li>
</ul>

///view-source:https://irinasutyagina.github.io/coursera-test/module4-solution/src1/menu/templates/home.template.html
///home.template.html
<a ui-sref="categoryList">Please see what's in menu!</a>

///'view-source:https://irinasutyagina.github.io/coursera-test/module4-solution/src1/menu/templates/main-menu.template.html
//main-menu.template.html


<a ui-sref="home">Home</a> &lt; <span>List</span>

<h3>Here is the categories you can choose from:</h3>
<category-list items="mainList.items"></category-list>
 <ui-view></ui-view>

//view-source:https://irinasutyagina.github.io/coursera-test/module4-solution/src1/menu/templates/category-detail.template.html
//category-detail.template.html

 <h1>Category details:</h1>
 <div class="row" ng-repeat="item in categoryDetail.items">
     <div class="col-xs-4">
         <p class="panel panel-default">
             {{item.name}}, {{item.short_name}}, {{item.description}}
         </p>
     </div>
 </div>
 </div>
