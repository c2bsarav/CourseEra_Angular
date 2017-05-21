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
   //alreadyBoughtlist.items = ShoppingListCheckerService.alreadyBought_getItems();
  //
  // alreadyBoughtlist.alreadyBought_AddItem = function () {
  //   ShoppingListCheckerService.alreadyBought_AddItem(list.itemName, list.itemQuantity);
  // };

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

  var alreadyBoughtItems = [];
  service.alreadyBought_AddItem = function (itemName, quantity){
    var alreadyBoughtItem ={
      name : itemName,
      quantity : quantity
    };
    alreadyBoughtItems.push(alreadyBoughtItem);
  }
  service.alreadyBought_getItems = function () {
    return alreadyBoughtItems;
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
