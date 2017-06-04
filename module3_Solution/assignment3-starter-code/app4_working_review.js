https://irinasutyagina.github.io/coursera-test/module3-solution/
//Index.html //irinasutyagina
<!doctype html>
<html ng-app = 'NarrowItDownApp' lang="en">
  <head>
    <title>Narrow Down Your Menu Choice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>

    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/styles.css">
  </head>
<body>
   <div ng-controller="NarrowItDownController as menu"  class="container">
    <h1>Narrow Down Your Chinese Menu Choice</h1>

    <div class="form-group">
      <input ng-model="menu.searchTerm" type="text" placeholder="search term" class="form-control">
    </div>
    <div class="form-group narrow-button">
      <button ng-click="menu.getMatchedMenuItems()" class="btn btn-primary">Narrow It Down For Me!</button>
    </div>
</br>
</br>
</br>
    <!-- found-items should be implemented as a component -->
    <found-items items ="menu.found" on-remove="menu.removeMenuItem(index)" message = '{{menu.nothingFoundMsg}}' ></found-items>
  </div>
</body>
</html>
//foundItems.html

<div ng-repeat="item in list.items track by $index">
  <div class="row">
    <div class="col-xs-4">
      <p>
        {{item.name}}, {{item.short_name}}, {{item.description}}
      </p>
    </div>
    <div class="col-xs-4">
      <button ng-click="list.onRemove({index:$index});">Don't want this one!</button>
    </div>
  </div>
</div>
<div class="emptyMessage" ng-hide="list.items.length">{{list.emptyResultMessage}}</div>



//app.js'
(function(){
    'use strict';

angular.module('NarrowItDownApp', [])
.controller ('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective(){
    var ddo = {
        templateUrl:'foundItems.html',
        scope: {
            items:'<',
            onRemove: '&',
            emptyResultMessage: '@message'

        },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
    };
    return ddo;
}

function FoundItemsDirectiveController (){
    var list = this;
}


NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {

    var menu = this;
    menu.found = [];
    menu.searchTerm = "";
    menu.nothingFoundMsg = "";

    menu.getMatchedMenuItems = function () {
        var promise = MenuSearchService.getMatchedMenuItems();
        menu.menuItems = [];
        promise.then(function (response) {
            var foundItems = [];
            console.log(response.data);
            console.log(response.data.menu_items.length);
            console.log(menu.searchTerm.toLowerCase());
            if (menu.searchTerm != "" && menu.searchTerm != null) {
                for (var i = 0; i < response.data.menu_items.length; i++) {
                    if (response.data.menu_items[i].description.toLowerCase().indexOf(menu.searchTerm.toLowerCase()) != -1) {
                        console.log(response.data.menu_items[i]);
                        foundItems.push(response.data.menu_items[i]);
                    }
                }
            }
            console.log(foundItems);
            menu.found = foundItems;
            menu.nothingFoundMsg = "Nothing found!";
        })
            .catch(function () {
                console.log('error');
            });

    };

    menu.removeMenuItem = function (itemIndex) {
        menu.found.splice(itemIndex, 1);
    }

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function () {
      var response =  $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
      });
      return response;
  }
};
})();

////Styles.css

h1 {
  margin-bottom: 30px;
}
input[type="text"] {
  width: 200px;
  float: left;
}
.narrow-button {
  float: left;
  margin-left: 10px;
}
.loader {
  display: none;
  margin-left: 5px;
  font-size: 10px;
  float: left;
  border-top: 1.1em solid rgba(147, 147, 147, 0.2);
  border-right: 1.1em solid rgba(147, 147, 147, 0.2);
  border-bottom: 1.1em solid rgba(147, 147, 147, 0.2);
  border-left: 1.1em solid #676767;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 3em;
  height: 3em;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
table, th, td {
    border: 1px solid black;
}
