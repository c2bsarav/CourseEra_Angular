//https://priyankamdeshmukh.github.io/Angular-Project/Search%20Your%20Favourite%20Dish/
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta charset="utf-8">
  <script type="text/javascript" src="libraries/angular.min.js"></script>
  <script type="text/javascript" src="scripts/app.js"></script>

  <link rel="stylesheet" href="styles/bootstrap.min.css">
  <link rel="stylesheet" href="styles/style.css">

</head>
<body ng-app="NarrowItDownApp">

  <div class="container" ng-controller="NarrowItDownController as narrowCon">  <h1>Welcome to Pram's Restaurant</h1>
    <input type="text" name="" value="" ng-model="narrowCon.search" class="form-control" placeholder="Enter dish name">
    <button type="button" name="button" class="btn btn-primary" ng-click="narrowCon.getMatchedMenuItems()">Narrow It Down</button>
    <div class="row">
      <span ng-if="narrowCon.emptyList">No item found</span>
    </div>

    <found-Items my-list="narrowCon.list" on-remove = "narrowCon.dontWantIt(index)" ></found-Items>

  </div>
</body>
</html>
//////'FoundItems.html

<ul>
  <li ng-repeat="lists in found">
    {{lists.name}} , {{lists.short_name}} ,{{lists.description}}
    <button type="button" class="btn btn-success" name="button" ng-click="onRemove({index:$index})">Don't want this one!</button>
  </li>
</ul>


////////''Styles.css'
input{
  border: 1px solid;
  width: 900px;
  margin-bottom: 20px;
}
.container{
  border: 1px solid grey;
  margin : 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 35px;
  font-family: sans-serif;
  font-size: 25px;
}
.row{
  text-align: center;
}
h1{
  font-weight: 400px;
  margin-bottom: 20px;
}
span {

  font-family: sans-serif;
  font-size: 25px;
  color: red
}
li{
  margin-bottom: 2px;
}

//app.js
(function() {
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems',foundItems);

  function foundItems() {
    var ddo={
      templateUrl: 'foundItems.html',
      scope: {
        found : '<myList',
        onRemove : '&'
      }
    }
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    var narrowCon = this;
    narrowCon.emptyList="";
    narrowCon.getMatchedMenuItems = function() {
      narrowCon.list = [];
      if (narrowCon.search !=="" && narrowCon.search!==undefined) {
        var promise = MenuSearchService.getMatchedMenuItems(narrowCon.search);
        promise.then(function(response) {
          narrowCon.list = response;
          if(response.length){
            narrowCon.emptyList=false;
          }
          else {
            narrowCon.emptyList=true;
          }
        });
      }
      else {
        narrowCon.emptyList=true;
      }
    }
    narrowCon.dontWantIt = function(index) {
      MenuSearchService.dontWantIt(index);
    }
  }

  MenuSearchService.$inject = ['$http'];

  function MenuSearchService($http) {
    var service = this;
    var arr = [];
    service.getMatchedMenuItems = function(search) {
      arr=[];
      var response = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      })
      .then(function(response) {
        var list = response.data;
        for (var i = 0; i <list.menu_items.length; i ++) {
          if (list.menu_items[i].description.indexOf(search) != -1) {
            arr.push(list.menu_items[i]);
          }
        }
        return arr;
      });
      return response;
    }
    service.dontWantIt = function (index) {
      arr.splice(index, 1);
    }
  }
})()
