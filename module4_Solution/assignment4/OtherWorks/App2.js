//https://taru82.github.io/Courseera-test/Assignment4/#/


<!DOCTYPE html>
<html ng-app='MenuApp'>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/styles.css">
    <title>Menu App of Resturant!!</title>
  </head>
  <body>
    <h1>Welcome to Taru's Resturant</h1>

    <ui-view></ui-view>

    <!-- Libraries -->
    <script src="lib/angular.min.js"></script>
    <script src="lib/angular-ui-router.min.js"></script>

    <!-- Modules -->
    <script src="src/menuapp/menuapp.module.js"></script>

    <!-- Routes -->
    <script src="src/routes.js"></script>

    <!-- 'MenuApp' module artifacts -->
    <script src="src/menuapp/menuapp.component.js"></script>
    <script src="src/menuapp/main-menuapp.controller.js"></script>
    <script src="src/menuapp/menuapp.service.js"></script>
    <script src="src/menuapp/item-detail.controller.js"></script>


  </body>
</html>

//////////////////////////////'Styles.css
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

.active {
  font-weight: bold;
}
li[ui-sref]:hover {
  display: inline-block;
  cursor: pointer;
  border: solid black 1px;
  padding-left: 5px;
  padding-right: 5px;
}


//////////////////////////////

// <script src="src/menuapp/menuapp.module.js"></script>
(function () {
'use strict';

angular.module('MenuApp', ['ui.router'])
    // .config(function () {
    //     console.log("Spinner config fired.");
    // }).
    // run(function () {
    //     console.log("Spinner run fired.");
    // });

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

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/menuapp/templates/main-menuapp.template.html',
    controller: 'MainMenuAppController as mainList',
    resolve: {

      items: ['MenuAppService', function (MenuAppService) {
        return MenuAppService.getAllCategories().then(function (response) {
           return response.data;

        })
      }]
    }
  })
      .state('itemDetail', {
          url: '/itemDetail/{itemId}',
          templateUrl: 'src/menuapp/templates/item-detail.template.html',
          controller: 'ItemDetailController as itemDetail',
            resolve: {
              item: ['$stateParams','MenuAppService',
                  function ( $stateParams,MenuAppService) {
                  return MenuAppService.getMenuForCategory()
                       .then(function (items) {
                               return items.data[$stateParams.itemId];
                           }
                   );

              }

              ]}
      });
}

})();

// <!-- 'MenuApp' module artifacts -->
// <script src="src/menuapp/menuapp.component.js"></script>
(function () {
'use strict';

angular.module('MenuApp')
.component('menuApp', {
  templateUrl: 'src/menuapp/templates/menuapp.template.html',
  bindings: {
    items: '<'
  }
});

})();

// <script src="src/menuapp/main-menuapp.controller.js"></script>
(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MainMenuAppController', MainMenuAppController);

    MainMenuAppController.$inject = ['items'];
    function MainMenuAppController(items) {
        var mainList = this;
        mainList.items = items;
    };
 })();
// <script src="src/menuapp/menuapp.service.js"></script>
(function () {
    'use strict';

    angular.module('MenuApp')
        .service('MenuAppService', MenuAppService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuAppService.$inject = ['$http', 'ApiBasePath','$rootScope']
    function MenuAppService($http, ApiBasePath, $rootScope) {
        var service = this;


 // Returns a promise with the list of category
        service.getAllCategories = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });
            return response;

        };
        service.getMenuForCategory = function (shortName) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json"),
                params: {
                    categories: shortName
                }
            });

            return response;
        };


        service.$onInit = function () {
            var cancel = $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options){
                    service.getAllCategories = true;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    service.getAllCategories = false;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    service.getAllCategories = true;
                });
            cancellers.push(cancel);
        };


    }
})();
// <script src="src/menuapp/item-detail.controller.js"></script>
(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemDetailController', ItemDetailController);

    // 'item' is injected through state's resolve

    ItemDetailController.$inject = ['item'];
    function ItemDetailController(item) {
        var itemDetail = this;
        itemDetail.name = item.name;
        itemDetail.shortName = item.short_name;
        itemDetail.specialInstructions = item.special_instructions;
        itemDetail.url = item.url;

    }
})();
