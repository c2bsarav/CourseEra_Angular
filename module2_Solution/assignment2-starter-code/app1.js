(function () {
  'use strict';

  angular.module('ShoppingListCheckerApp', [])
  .controller('ShoppingListCheckerController', ShoppingListCheckerController)
  .provider('ShoppingListCheckerService', ShoppingListCheckerServiceProvider)
  .config(Config);

  Config.$inject = ['ShoppingListCheckerServiceProvider'];
  function Config(ShoppingListCheckerServiceProvider) {
    ShoppingListCheckerServiceProvider.defaults.maxItems = 2;
  }

  ShoppingListCheckerController.$inject = ['ShoppingListCheckerService'];
  function ShoppingListCheckerController(ShoppingListCheckerService) {
  var list = this;


  list.items = ShoppingListCheckerService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      ShoppingListCheckerService.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  };

  list.removeItem = function (itemIndex) {
    ShoppingListCheckerService.removeItem(itemIndex);
  };

  //var alreadyBoughtlist = this;

}

// If not specified, maxItems assumed unlimited
function ShoppingListCheckerService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

function ShoppingListCheckerServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListCheckerService(provider.defaults.maxItems);

    return shoppingList;
  };
}

})();
/*
http://errors.angularjs.org/1.5.7/$injector/unpr?p0=ShoppingListCheckOffServiceProvider
%20%3C-%20ShoppingListCheckOffService%20%3C-%20ShoppingList_AlreadyBoughtController

https://c2bsarav.github.io/CourseEra_Angular/module2_Solution/assignment2-starter-code/index.html

Shopping Check List

It will list 5 items under "To Buy". when you click the check box button, it will add to "Already Bought List".
During the initial load, when "Already Bought" list is empty, it will display "Nothing Bought Yet"
When "To Buy" List is empty, it will display "Everything is Bought".

*/
