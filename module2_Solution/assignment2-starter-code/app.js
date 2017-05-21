(function () {
  'use strict';

  angular.module('ShoppingListCheckerApp', [])
  .controller('ShoppingList_ToBuyController', ShoppingList_ToBuyController)
  .controller('ShoppingList_AlreadyBoughtController', ShoppingList_AlreadyBoughtController)
  .service('ShoppingListCheckerService', ShoppingListCheckerService)

  //Controller that has a list of Available Items
  ShoppingList_ToBuyController.$inject = ['ShoppingListCheckerService'];
  function ShoppingList_ToBuyController(ShoppingListCheckerService) {
    var toBuyList = this;

    toBuyList.availableToBuyList = ShoppingListCheckerService.availableToBuy();

    toBuyList.addToAlreadyBoughtList = function (itemIndex) {
      ShoppingListCheckerService.addToAlreadyBoughtList(itemIndex);
    };

  	toBuyList.messageCheck = function () {
  		return (toBuyList.availableToBuyList == "");
  	};
  }

  //This is the controller that will be responsible for the list 2
	ShoppingList_AlreadyBoughtController.inject = ['ShoppingListCheckerService'];
	function ShoppingList_AlreadyBoughtController (ShoppingListCheckerService) {
		var alreadyBoughtlist = this;

		alreadyBoughtlist.boughtList = ShoppingListCheckerService.alreadyBoughtlist;

		alreadyBoughtlist.messageCheck = function () {
			return (alreadyBoughtlist.boughtList == "");
		};
	}

// If not specified, maxItems assumed unlimited
function ShoppingListCheckerService() {
  var service = this;
  service.availableToBuyList = [];
  service.alreadyBoughtlist = [];

	service.availableItemsList = [
	{
		name: 'Cookies',
		quantity: '10 Bags'
  },
	{
		name: 'Quaker Oats',
		quantity: '10 Boxes'
  },
	{
		name: 'Water Bottles',
		quantity: '5 Bottles'
  },
	{
		name: 'Buiscuits',
		quantity: '2 Packs'
  },
	{
		name: 'Mountain Dew',
		quantity: '2 Packs'
  }
	];

	service.availableToBuy = function () {
		service.availableToBuyList = service.availableItemsList;
		return service.availableToBuyList;
	};

	service.addToAlreadyBoughtList = function (itemIndex) {
		var x = service.availableToBuyList.splice(itemIndex, 1)[0];
		service.alreadyBoughtlist.push(x);
		return service.alreadyBoughtlist;
	};
}
})();
