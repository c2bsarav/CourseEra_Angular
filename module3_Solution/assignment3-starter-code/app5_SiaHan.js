https://rotatingfan.github.io/angular_assign3/

<!doctype html>
<html lang="en" ng-app="NarrowDownMenuApp">
  <head>
    <title>Narrow Down Your Menu Choice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/styles.css">
  </head>
<body>
   <div class="container" ng-controller="NarrowDownMenuController as narrowDownMenu">
    <h1>Narrow Down Your Chinese Menu Choice</h1>
    <div class="row">
      <div class="form-group">
        <input type="text" placeholder="search term" lass="form-control" ng-model="narrowDownMenu.searchTerm">
        <div class="narrow-button">
          <button class="btn btn-primary" ng-click="narrowDownMenu.getMenu(narrowDownMenu.searchTerm)">Narrow It Down For Me!</button>
        </div>
      </div>

    </div>

    <!-- found-items should be implemented as a component -->
    <found-items menu-list="narrowDownMenu" on-remove=""></found-items>

</body>
</html>

/////////////////////app.js
(function(){

'use strict'

angular.module('NarrowDownMenuApp', [])
.controller('NarrowDownMenuController',NarrowDownMenuController)
.service('NarrowDownMenuService',NarrowDownMenuService)
.directive('foundItems', foundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowDownMenuController.$inject = ['NarrowDownMenuService']
function NarrowDownMenuController(NarrowDownMenuService){
    var controller = this;

    controller.foundItemsList = NarrowDownMenuService.getItems();

    controller.searchTerm = '';

    controller.onRemove = function (itemIndex) {
        NarrowDownMenuService.removeItem(itemIndex);
    };

    controller.getMenu = function(searchTerm){

        if(searchTerm == null || searchTerm == ''){
            NarrowDownMenuService.resetitemArray();
            controller.foundItemsList = NarrowDownMenuService.getItems();
            return false;
        }

        var promise = NarrowDownMenuService.getMenuForCatrgory('');

        promise.then(function(response){
            console.log(response.data);
            var itemsArray = response.data.menu_items;
            NarrowDownMenuService.resetitemArray();

            angular.forEach(itemsArray, function(item) {
              if(checkIfSimilar(searchTerm, item) == true){
                  NarrowDownMenuService.addItem(item.name, item.description);
              }
            });
            controller.foundItemsList = NarrowDownMenuService.getItems();
            console.log(NarrowDownMenuService.getItems());
        })
        .catch(function(error){
            console.log(error)
        });
    };

    function checkIfSimilar(searchTerm, item){
        var name = item.name;

        if (name.toLowerCase().indexOf(searchTerm) !== -1) {
            return true;
        }else{
            return false;
        }

    };
}


NarrowDownMenuService.$inject = ['$http', 'ApiBasePath'];
function NarrowDownMenuService($http, ApiBasePath){
    var service = this;

    var foundItemArray = [];

    service.getItems = function(){
        return foundItemArray;
    };

    service.addItem = function(itemName, itemDescription){
        var item={
            name:itemName,
            description: itemDescription
        };
        foundItemArray.push(item);

    };

    service.removeItem = function (itemIndex) {
        foundItemArray.splice(itemIndex, 1);
    };

    service.resetitemArray = function(){
        foundItemArray = [];
    };

    service.getMenuForCatrgory = function(searchTerm){
        var response = $http({
            method:"GET",
            url: (ApiBasePath + "/menu_items.json"),
            params:{
                category: searchTerm
            }
        });

        return response;
    };
}

function foundItemsDirective(){
    var ddo={
        templateUrl:'foundItems.html',
        scope:{
            menuList: '=menuList'
        },
    };

    return ddo;

}


})();


//////////////////styles.css

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

//////foundItems.html


<div class="row" ng-repeat="item in menuList.foundItemsList" style="margin-bottom:5px;border: 1px solid grey; border-radius:2px;">
    <div class="col-md-12">
        <h2>{{item.name}}</h2>
        <p>{{item.description}}</p>
    </div>
    <div class="col-md-12" style="margin-bottom:5px;">
        <button class="btn btn-primary pull-right" ng-click="menuList.onRemove( $index );">Don't want this one!</button>
    </div>
</div>

<div class="error" ng-if="menuList.foundItemsList.length == 0">Nothing found</div>
