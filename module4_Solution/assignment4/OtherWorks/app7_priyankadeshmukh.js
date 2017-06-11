////https://priyankamdeshmukh.github.io/Angular-Project/Restaurant%20Website/#/


<!DOCTYPE html>
<html ng-app="ShoppingListApp">
  <head>
    <meta charset="utf-8">
    <title>Shopping List</title>
    <link rel="stylesheet" href="styles/style.css">
  </head>
  <body>
    <h1 style="text-align: center">Welcome to Cafe Mondegar..</h1>
    <ui-view class="views"></ui-view>



    <!-- Libraries -->
    <script src="lib/angular.min.js"></script>
    <script src="lib/angular-ui-router.min.js"></script>

    <!-- Modules -->
    <script src="src/shoppingList/shoppingList-module.js"></script>

    <!-- Routes -->
    <script src="src/routes.js"></script>

    <!-- 'ShoppingList' module artifacts -->

    <script src="src/shoppingList/ShoppingListController.js"></script>
    <script src="src/shoppingList/ItemDetailController.js"></script>
    <script src="src/shoppingList/ShoppingListService.js"></script>

    <script src="src/shoppingList/ShoppingListComponent.js"></script>
    <script src="src/shoppingList/ItemDetailsComponent.js"></script>


  </body>
</html>

//Styles.css
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
.views{

}



<!-- Modules -->
// <script src="src/shoppingList/shoppingList-module.js"></script>
(function () {
  angular.module('ShoppingListApp', ['ui.router']);
})()
// <!-- Routes -->
// <script src="src/routes.js"></script>
(function () {
  angular.module('ShoppingListApp')
  .config(doSomething);
  doSomething.$inject = ['$stateProvider', '$urlRouterProvider'];
  function doSomething($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home',{
      url : '/',
      templateUrl : 'src/shoppingList/templates/homePage.html'
    })
    .state('fullList',{
      url : '/fullList-url',
      templateUrl : 'src/shoppingList/templates/fullList.html',
      controller : 'ShoppingListController as SLCon',
      resolve : {
        myItm : ['ShoppingListService', function (ShoppingListService) {
          return ShoppingListService.getMyItems();
        }]
      }
    })
    .state('itemDetail',{
      url : '/item-Detail/{categoryShortName}',
      templateUrl : 'src/shoppingList/templates/IndividualItemDetails.html',
      controller : 'ItemDetailController as itemDetail',
      resolve : {
        ItmD: ['$stateParams','ShoppingListService', function ($stateParams,ShoppingListService) {
          console.log($stateParams);
          return ShoppingListService.getMyItemD($stateParams.categoryShortName);
        }]
      }
    })
  }
})()


//src/shoppingList/templates/homePage.html
<a ui-sref="fullList"><h2>Click to get a list of categories</h2></a>
//src/shoppingList/templates/fullList.html

<a ui-sref="home">Home</a>
<shop itemss="SLCon.itemss"></shop>
<!-- <ui-view></ui-view> -->

//src/shoppingList/templates/IndividualItemDetails.html

<a ui-sref="home"> Home< </a>
<a ui-sref="fullList"> Categories </a>
<why last="itemDetail.last"></why>

// <!-- 'ShoppingList' module artifacts -->
//
// <script src="src/shoppingList/ShoppingListController.js"></script>


(function () {
  angular.module('ShoppingListApp')
  .controller('ShoppingListController',ShoppingListController);
  ShoppingListController.$inject=['ShoppingListService','myItm'];
  function ShoppingListController(ShoppingListService,myItm) {

          var con=this ;
          // con.itemss=[];
          // con.$onInit =function () {
          //   ShoppingListService.getMyItems()
          //   .then(function (result) {
          //     con.itemss = result.data;
          //   });
          //
          // }
          con.itemss=myItm.data;

  console.log(   con.itemss);
  }
})()
// <script src="src/shoppingList/ItemDetailController.js"></script>
(function () {
  angular.module('ShoppingListApp')
  .controller('ItemDetailController',ItemDetailController);
  ItemDetailController.$inject=['ShoppingListService','ItmD']
  function ItemDetailController(ShoppingListService,ItmD) {
    var temp=this;
    temp.last=ItmD.data.menu_items;
  }
})()
// <script src="src/shoppingList/ShoppingListService.js"></script>


(function () {
  angular.module('ShoppingListApp')
  .service('ShoppingListService',ShoppingListService);
  ShoppingListService.$inject=['$http'];
  function ShoppingListService($http) {
      var promise = this;
      promise.getMyItems=function() {
        var response = $http({
         method : "get",
         url : 'https://davids-restaurant.herokuapp.com/categories.json'
       });
       console.log(response);
       return response;
      }
      promise.getMyItemD=function(categoryShortName) {
        console.log("called...");
        console.log("asd"+categoryShortName);
        var response=$http({
         method : "get",
         url : ('https://davids-restaurant.herokuapp.com/menu_items.json?category='+categoryShortName)
       });
       console.log(response);
       return response;
      }
  }
})()
// <script src="src/shoppingList/ShoppingListComponent.js"></script>
(function () {
  angular.module('ShoppingListApp')
  .component('shop',{
    templateUrl:'src/shoppingList/templates/ShoppingListComponent.html',
    bindings:{
      itemss:'<'
    }
  })
})()
// <script src="src/shoppingList/ItemDetailsComponent.js"></script>
(function () {
  angular.module('ShoppingListApp')
  .component('why',{
    templateUrl : 'src/shoppingList/templates/ItemDetailsComponent.html',
    bindings : {
      last : '<'
    }
  })
})()
