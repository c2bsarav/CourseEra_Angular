(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: '/CourseEra_Angular/module3_Solution/assignment3-starter-code/founditems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItems',
    bindToController: true,
    link:FoundItemsDirectiveLink,
    transclude:true
  };

  return ddo;
}
function FoundItemsDirectiveLink(scope, element, attrs, controller) {
  // console.log("Link scope is: ", scope);
  // console.log("Controller instance is: ", controller);
  // console.log("Element is: ", element);
  // scope.$watch('list.foundItems', function (newValue, oldValue) {
  //   console.log("Old value: ", oldValue);
  //   console.log("New value: ", newValue);
  // });
}
function FoundItemsDirectiveController() {

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  //menu.searchTerm;
  //menu.found;

  menu.search = function(){
    menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    menu.found.then(function (response) {
      menu.found = response;
    }
    )
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  menu.remove = function(itemIndex){
    menu.found.splice(itemIndex,1);
  }

  menu.isEmpty = function () {
    if(menu.found.length <=0){
      return true;
    }
  };
}
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    service.searchTerm = searchTerm;
    return $http(
    {
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
    // process result and only keep items that match
    var foundItems = new Array();
    foundItems = result.data.menu_items.filter(function (item) {
      if (searchTerm === undefined){
        return null;
      }else{
          return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      }
    }, service);
    return foundItems;
  });
  };
}
})();
