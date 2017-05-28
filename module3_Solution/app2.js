<!doctype html>
<html lang="en">
  <head>
    <title>Narrow Down Your Menu Choice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/styles.css">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
  </head>
<body>
   <div class="container" ng-controller="NarrowItDownController as list">
    <h1>Narrow Down Your Chinese Menu Choice</h1>

    <div class="form-group">
      <input type="text" placeholder="search term" class="form-control" ng-model="list.searchTerm" >
    </div>
    <div class="form-group narrow-button">
      <button class="btn btn-primary" ng-click="list.searchMenuItems();">Narrow It Down For Me!</button>
    </div>

    <!-- found-items should be implemented as a component -->
    <found-items  found="list.found"
          empty="list.empty"
          on-remove="list.removeItem(index)">
    </found-items>
  </div>

</body>
</html>



<!doctype html>
<html ng-app="NarrowItDownApp" lang="en">
  <head>
    <title>Narrow Down Menu Choice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
  </head>
<body>
   <div ng-controller="NarrowItDownController as list">
    <h1>Narrow Down Your Chinese Menu Choice</h1>
      <input ng-model="list.searchTerm" type="text" placeholder="search term">
      <button ng-click="list.searchMenuItems();">Narrow It Down For Me!</button><!-- found-items should be implemented as a component -->
    <found-items found="list.found" empty="list.empty" on-remove="list.removeItem(index)"></found-items>
  </div>
</body>
</html>



(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.searchTerm = "";
  list.found = [];
  list.empty = false;

  list.searchMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
    promise.then(function (response) {
      list.found = response;
      list.empty = MenuSearchService.isEmpty();
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  list.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'searchTerms.html',
    scope: {
      found: '<',
      onRemove: '&',
      empty: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(response){
      foundItems = searchTearmOnArray(
        searchTerm.toLowerCase(),
        response.data["menu_items"]
      );
      return foundItems;
    });
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

  service.isEmpty = function(){
    return (foundItems.length == 0);
  };

  function searchTearmOnArray(enteredText, arrayOfItem){
    if (enteredText != ""){
      return itemsThatMatchedTerm(enteredText, arrayOfItem);
    }
    return [];
  }

  function itemsThatMatchedTerm(enteredText, arrayOfItem){
    var arrayOfMatchedItem = [];
    for (var i = 0; i < arrayOfItem.length; i++) {
      if (arrayOfItem[i].description.includes(enteredText)){
        arrayOfMatchedItem.push(arrayOfItem[i]);
      }
    }
    return arrayOfMatchedItem;
  }

}

})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
https://github.com/daveleslie/angulartut/tree/master/assignment3/module3-solution
daveleslie/angulartut

<!doctype html>
<html lang="en">
    <head>
        <title>Narrow Down Your Menu Choice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles/bootstrap.min.css">
        <link rel="stylesheet" href="styles/styles.css">

        <script src="js/angular.min.js"></script>
        <script src="js/app.js"></script>

    </head>
    <body ng-app="NarrowItDown">
        <div class="container">
            <h1>Narrow Down Your Chinese Menu Choice</h1>
            <div ng-controller="NarrowItDownController as menu">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <input type="text" placeholder="search term" class="form-control" ng-model="menu.searchTerm" ng-keyup="$event.keyCode == 13 ? menu.narrow(menu.searchTerm) : null">
                    </div>
                    <div class="form-group narrow-button col-sm-3 col-sm-pull-1">
                        <button class="form-control btn btn-primary" ng-click="menu.narrow(menu.searchTerm);">
                            Narrow It Down For Me!
                        </button>
                    </div>
                </div>
                <!-- found-items should be implemented as a component -->
                <div class="row">
                    <found-items items="menu.found" title="{{menu.title}}" on-remove="menu.removeItem(index)" search="menu.filter"></found-items>
                </div>

            </div>


            <!-- Bonus loader (see Bonus section of the assignment) -->
            <!--<items-loader-indicator></items-loader-indicator>-->


        </div>

    </body>
</html>

FOUNDITEMS.html

<ul class="list-group">
    <li ng-if="$ctrl.items.length == 0" class="list-group-item list-group-item-danger text-center"><strong> Nothing found! </strong></li>
    <li ng-if="$ctrl.items.length >= 1" class="list-group-item active"><span class="badge">{{$ctrl.items.length}}</span><strong> Items containing: {{$ctrl.search}}</strong></li>
    <li ng-repeat="item in $ctrl.items" class="list-group-item">
        <div class="row">
            <div class="col-sm-10">
                <strong>{{item.name}}</strong> ({{item.short_name}})
                <p style="font-style: italic;">{{item.description}}</p>
            </div>
            <div class="col-sm-2 text-right">
                <button ng-click="$ctrl.onRemove({index: $index});" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-remove" style="color: red;"></span> Don't want this one!</button>
            </div>
        </div>
    </li>
</ul>


styles.css
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

li {
    padding-top: 0;
}

app.js


(function () {
    'use strict';
    angular.module('NarrowItDown', [])

        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('APIBasePath', "https://davids-restaurant.herokuapp.com")
        .component('foundItems', {
            templateUrl: 'foundItems.html',
            bindings: {
                items: '<',
                title: '@',
                onRemove: '&',
                search: '<'
            }
        });


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = '';

        menu.narrow = function(searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function (response) {
                    menu.found = response;
                    menu.title = (menu.found.length+" item(s) found");
                    menu.filter = searchTerm;
                })
                .catch(function (error) {
                   console.log("error in click function");
                });
        };

        menu.removeItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
            console.log("item removed");
            menu.title = (menu.found.length+" item(s) found");
            console.log(menu.title);
        };
    }


    MenuSearchService.$inject = ['$http', 'APIBasePath'];
    function MenuSearchService($http, APIBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({method: "GET", url: (APIBasePath+"/menu_items.json")})
                .then(function (response) {
                    // process the result and only keep items that match
                    var allItems = response.data.menu_items;
                    var foundItems = [];

                    if (searchTerm.length == 0) {
                        allItems = [];
                    } else {
                        for (var i = 0; i < allItems.length; i++) {
                            var str = allItems[i].description;

                            if (str.toLowerCase().indexOf(searchTerm) >= 0) {
                                foundItems.push(allItems[i]);
                            }
                        }
                    }

                    return foundItems;
                })
                .catch(function (error) {
                        console.log("error in service method");
                });
        };
    }


})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
