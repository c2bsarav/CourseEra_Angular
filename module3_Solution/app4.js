https://oldlance.github.io/coursera-angularjs/assignment-3/
///SUPER
/////index.html

<!doctype html>
<html lang="en">
  <head>
    <title>Narrow Down Your Menu Choice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/styles.css">
  </head>
<body ng-app="NarrowItDownApp">
   <div class="container" ng-controller="NarrowItDownController as nidc">
    <div class="row"> <!-- row 1 -->
      <h1>Narrow Down Your Chinese Menu Choice</h1>
      <form>
        <div class="form-group">
          <input type="text" placeholder="search term" class="form-control" ng-model="nidc.searchTerm">
        </div>
        <div class="form-group narrow-button">
          <button type="submit" class="btn btn-primary"  ng-click="nidc.doSearch();">Narrow It Down For Me!</button>
        </div>
      </form>
    </div> <!-- row 1 -->

    <div class="row"> <!-- row 2 -->
      <found-items items="nidc.found" on-remove="nidc.removeItem(index)"></found-items>
    </div> <!-- row 2 -->

  </div> <!-- ng-controller=NarrowItDownController as nidc -->

  <script src="angular.min.js"></script>
  <script src="app.js"></script>

</body>
</html>


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


//////app.js

(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
    console.log("FoundItemsDirective")
    var ddo = {
        templateUrl : 'foundItems.html',
        restrict: 'E',
        scope: {
            items: '<',
            onRemove: '&'
        }
    };
    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(menuSearch) {
    var self = this;

    self.searchTerm = "";
    self.found = [];

    self.doSearch = function() {
        menuSearch.getMatchedMenuItems(self.searchTerm).then(function (result){
            self.found = result
        }).catch(function(result){ console.log("An error occurred: ", result)})
    }

    self.removeItem = function(index) {
        console.log("Asked to remove item number: ", index)
        self.found.splice(index,1)
    }
}

// Retrieves the menu from  the menu server and filters the
// list to those incuding a searchTerm.
// Return the whole list if searchTerm is not defined.
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        var response = $http(
            {
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }
        ).then(function(result) {
            var items = result.data.menu_items;
            var filteredItems = [];
            var i;
            for (i = 0; i < items.length; i++ ) {
                if (isInString(items[i].description, searchTerm)) {
                    console.log("match: ", items[i].description)
                    filteredItems.push(items[i]);
                }
            }
            return filteredItems
        })
        return response
    }
}

// Used searching for one string (term) inside another (toSearch).
// Ignores case and leading and trailing spaces.
function isInString(toSearch, term) {
    var retval = false
    if (toSearch !== undefined && term !== undefined) {
        var cleanToSearch = toSearch.trim().toLowerCase()
        var cleanTerm = term.trim().toLowerCase()
        retval = cleanToSearch.includes(term)
    }
    return retval
}

})()


////foundItems.html


<!-- found-items custom directive -->
<table ng-if="items.length > 0;" class="table table-bordered">
    <thead> <th>Name</th><th>Short name</th><th>Description</th><th></th> </thead>
    <tr ng-repeat="item in items">
        <td>{{item.name}}</td>
        <td>{{item.short_name}}</td>
        <td>{{item.description}}</td>
        <td><button type="button" class="btn btn-default btn-xs btn-warning" ng-click="onRemove({index: $index})">Don't want this one!</Button></td>
    </tr>
</table>
<div ng-if="items.length == 0;">Nothing found</div>
