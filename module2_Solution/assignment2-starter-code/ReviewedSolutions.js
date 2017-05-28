
<!doctype html>
<html ng-app='ShoppingListCheckOff' lang="en">
  <head>
    <title>Shopping List Check Off</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/main.css">
    <script src="scripts/angular.min.js"></script>
    <script src="scripts/app.js"></script>
  </head>
<body>
  <div class="container">
  <h1>Shopping List Check Off</h1>

  <div class="row">

    <!-- To Buy List -->
    <div ng-controller='ToBayController as itemToBay' class="col-md-6">
     <h2>To Bay:</h2>

     <ul>
       <li ng-repeat="items in itemToBay.items">
         {{$index+1}}.
         <button ng-click="itemToBay.BayItem($index)" class="btn btn-default">
         <span class="glyphicon glyphicon-ok"></span>
         Bought
        </button>
        {{items.quantity}} of {{items.name}}
     </ul>
     <div ng-if="itemToBay.checkBasket.showBay()" class="emptyMessage">
       Everything is bought!
     </div>
   </div>
    <!-- Already Bought List -->
    <div ng-controller='AlreadyBoughtController as itemBought' class="col-md-6">
     <h2>Already Bought:</h2>
     <ul>
       <li ng-repeat="boughtitems in itemBought.boughtitems">
         {{$index+1}}. {{boughtitems.quantity}} of {{boughtitems.name}}
     </ul>
     <div ng-if="itemBought.checkBasket.showBought()" class="emptyMessage">
       Nothing bought yet!
     </div>
    </div>
  </div>
</div>

</body>
</html>

(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBayController', ToBayController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBayController.$inject = ['ShoppingListCheckOffService'];
function ToBayController(ShoppingListCheckOffService) {
  var itemToBay = this;

 itemToBay.items = ShoppingListCheckOffService.ShowToBuyItems();
 itemToBay.BayItem = function (itemIndex) { ShoppingListCheckOffService.BayItem(itemIndex);
 };
 itemToBay.checkBasket = ShoppingListCheckOffService.checkBasket();
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemBought = this;

  itemBought.boughtitems = ShoppingListCheckOffService.ShowBoughtItems();
  itemBought.checkBasket = ShoppingListCheckOffService.checkBasket();
}

function ShoppingListCheckOffService() {
var service = this;

var items = [
  {'name' : 'Cookies', 'quantity' : '10 bags'},
  {'name' : 'Chips', 'quantity' : '5 bags'},
  {'name' : 'Coke', 'quantity' : '7 bottles'},
  {'name' : 'Sweets', 'quantity' : '15 bags'},
  {'name' : 'Chocolate', 'quantity' : '20 bars'}
];

var boughtitems = [];

var checkBasket={
   showBay : function() {
     if (items.length == 0) {
     return "false"
    }
  },
   showBought : function() {
     if (boughtitems.length == 0) {
     return "true"
      }
   }
  };

console.log(checkBasket);

service.ShowToBuyItems = function () {
  return items;
}

service.BayItem = function (itemInd) {
  boughtitems.push(items[itemInd]);
  items.splice(itemInd, 1);
  return boughtitems;
}

service.ShowBoughtItems = function () {
  return boughtitems;
}

service.checkBasket = function () {
  return checkBasket
}

}
})();
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

<!doctype html>
<html lang="en" ng-app="ShoppingListCheckOffApp">

<head>
  <title>Shopping List Check Off</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles/bootstrap.min.css">
  <script src="angular.min.js"></script>
  <script src="app.js"></script>
  <style>
    .emptyMessage {
      font-weight: bold;
      color: red;
      font-size: 1.2em;
    }

    li {
      margin-bottom: 7px;
      font-size: 1.2em;
    }

    li>button {
      margin-left: 6px;
    }

    button>span {
      color: green;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Shopping List Check Off</h1>

    <div class="row">

      <!-- To Buy List -->
      <div class="col-md-6" ng-controller="ToBuyController as toBuyList">
        <h2>To Buy:</h2>
        <ul>
          <li ng-repeat="item in toBuyList.items">
            Buy {{ item.quantity }} {{ item.name }}
            <button class="btn btn-default" ng-click="toBuyList.buyItem($index);">
           <span class="glyphicon glyphicon-ok"></span> Bought</button>
          </li>
        </ul>
        <div class="emptyMessage" ng-hide="toBuyList.items.length">Everything is bought!</div>
      </div>

      <!-- Already Bought List -->
      <div class="col-md-6" ng-controller="AlreadyBoughtController as alreadyBoughtList">
        <h2>Already Bought:</h2>
        <ul>
          <li ng-repeat="item in alreadyBoughtList.items">
            Bought {{ item.quantity }} {{ item.name }}
          </li>
        </ul>
        <div class="emptyMessage" ng-hide="alreadyBoughtList.items.length">Nothing bought yet.</div>
      </div>
    </div>
  </div>

</body>

</html>


(function () {
    'use strict';
    angular.module('ShoppingListCheckOffApp', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyLIst = this;

        toBuyLIst.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyLIst.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtList = this;
        alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [
            {
                name: "Apple",
                quantity: "1"
            },
            {
                name: "Banana",
                quantity: "2"
            },
            {
                name: "Tomato",
                quantity: "3"
            },
            {
                name: "Milk",
                quantity: "4"
            },
            {
                name: "Coffee",
                quantity: "5"
            },
            {
                name: "Tea",
                quantity: "6"
            },
        ];

        var alreadyBoughtItems = [];

        service.getToBuyItems = function () {
            return toBuyItems;
        }

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        }

        service.buyItem = function (itemIndex) {
            alreadyBoughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex, 1);
        }

    }

})();

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


<!doctype html>
<html lang="en">
  <head>
    <title>Shopping List Check Off</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <style>
      .emptyMessage {
        font-weight: bold;
        color: red;
        font-size: 1.2em;
      }
      li {
        margin-bottom: 7px;
        font-size: 1.2em;
      }
      li > button {
        margin-left: 6px;
      }
      button > span {
        color: green;
      }
    </style>
  </head>
<body ng-app="ShoppingListCheckOff">
  <div class="container">
  <h1>Shopping List Check Off</h1>

  <div class="row">

    <!-- To Buy List -->
    <div class="col-md-6" ng-controller="ToBuyController as toBuy">
     <h2>To Buy:</h2>
     <ul>
       <li ng-repeat="item in toBuy.items">Buy {{item.quantity}} {{item.name}} <button class="btn btn-default" ng-click="toBuy.buyItem($index);"><span class="glyphicon glyphicon-ok"></span> Bought</button></li>
     </ul>
     <div ng-if="toBuy.items.length == 0" class="emptyMessage">Everything is bought!</div>
    </div>

    <!-- Already Bought List -->
    <div class="col-md-6" ng-controller="AlreadyBoughtController as alreadyBought">
     <h2>Already Bought:</h2>
     <ul>
       <li ng-repeat="item in alreadyBought.items">Bought {{item.quantity}} {{item.name}}</li>
     </ul>
     <div ng-if="alreadyBought.items.length == 0" class="emptyMessage">Nothing bought yet.</div>
    </div>
  </div>
</div>
<script src="angular.min.js"></script>
<script src="app.js"></script>
</body>
</html>

// Shopping List Check Off assignment
(function() {
'use strict;'

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService); // singleton service

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(checkOffService) {
        var toBuy = this;

        toBuy.items = checkOffService.getToBuyItems();

        toBuy.buyItem = function(itemIndex) {
            checkOffService.buyItem(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(checkOffService) {
        var alreadyBought = this;
        alreadyBought.items = checkOffService.getAlreadyBoughtItems();
    }

    // Singleton function constructor that is injected into controllers that
    // need access to the shopping checkoff functionality.
    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
                {name: "Chops", quantity: 6},
                {name: "Shallots", quantity: 12 },
                {name: "bulb of Garlic", quantity: 1 },
                {name: "sprig of Thyme", quantity: 1},
                {name: "small jar of Capers", quantity: 1 },
                {name: "head of Brocolli", quantity: 1 },
                {name: "New Potatoes", quantity: 12 },
                {name: "bottle of White Wine", quantity: 1}
                ];

        var alreadyBoughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        }

        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        }

        // Move a bought item from toBuy to alreadyBought
        // TODO: add some error handling
        service.buyItem = function(itemIndex) {
            var item = toBuyItems[itemIndex];
            alreadyBoughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        }
    }

})();
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


<!doctype html>
<html lang="en" ng-app="ShoppingListCheckOff">
  <head>
    <title>Shopping List Check Off</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
    <style>
      .emptyMessage {
        font-weight: bold;
        color: red;
        font-size: 1.2em;
      }
      li {
        margin-bottom: 7px;
        font-size: 1.2em;
      }
      li > button {
        margin-left: 6px;
      }
      button > span {
        color: green;
      }
    </style>
  </head>

<body>
  <div class="container">
  <h1>Shopping List Check Off</h1>

  <div class="row">
    <!-- To Buy List -->
    <div class="col-md-6" ng-controller="ToBuyController as BuyList">
     <h2>To Buy:</h2>
     <ul>
       <li ng-repeat="item in BuyList.items()">Buy {{ item.quantity }} {{ item.name }}
         <button class="btn btn-default" ng-click="BuyList.buy($index);">
           <span class="glyphicon glyphicon-ok"></span>
           Bought
         </button>
       </li>
     </ul>
     <div class="emptyMessage" ng-if="BuyList.allBought">{{ toBuyList.allBought }}</div>
    </div>

    <!-- Already Bought List -->
    <div class="col-md-6" ng-controller="AlreadyBoughtController as alreadyBought">
     <h2>Already Bought:</h2>
     <ul>
       <li ng-repeat="item in alreadyBought.items()">Bought {{item.quantity}} {{item.name}}</li>
     </ul>
     <div class="emptyMessage" ng-if="alreadyBought.nothingBought">{{ alreadyBought.nothingBought }}</div>
    </div>
  </div>
</div>

</body>
</html>

(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller("ToBuyController",ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuy = this;

  toBuy.items = function(){
    try{
      return ShoppingListCheckOffService.getToBuyItems();
    }
    catch(e)
    {
      toBuy.allBought = "Everything is bought!";
    }
  }

  toBuy.buy = function(itemIndex){
    try {
      ShoppingListCheckOffService.buyItem(itemIndex);
    } catch (e) {

    }
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBought = this;

  alreadyBought.items = function(){
    try {
      var list = ShoppingListCheckOffService.getBoughtItems();
      alreadyBought.nothingBought = null;
      return list;

    } catch (e) {
      alreadyBought.nothingBought = e.message;
    }
  }
}

function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItems = [
    { name: "Cookies", quantity: 5 },
    { name: "Soda" , quantity: 1},
    { name: "Chips" , quantity: 3},
    { name: "Dip" , quantity: 2},
    { name: "Pepto Bismol" , quantity: 4}
  ]

  var boughtItems = [];

  service.getToBuyItems = function(){
    if(toBuyItems.length == 0)
      throw new Error("Everything is bought!");
    else
      return toBuyItems;
  }

  service.getBoughtItems = function(){
    if(boughtItems.length == 0){
      throw new Error("Nothing bought yet.");
    }
    else{
      return boughtItems;
    }
  };

  service.buyItem = function(itemIndex){
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex,1);
  }
}

})();
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

<!doctype html>
<html lang="en">
  <head>
    <title>Shopping List Check Off</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <style>
      .emptyMessage {
        font-weight: bold;
        color: red;
        font-size: 1.2em;
      }
      li {
        margin-bottom: 7px;
        font-size: 1.2em;
      }
      li > button {
        margin-left: 6px;
      }
      button > span {
        color: green;
      }
    </style>
    <script src="js/angular.min.js"></script>
    <script src="js/app.js"></script>
  </head>
  <body ng-app="ShoppingListCheckOff">
    <div class="container">
      <h1>Shopping List Check Off</h1>

      <div class="row">
        <!-- To Buy List -->
        <div class="col-md-6" ng-controller="ToBuyShoppingController as toBuy">
          <h2>To Buy:</h2>
          <ul>
            <li ng-repeat="item in toBuy.items">
              Buy {{item.quantity}} {{item.name}}
              <button class="btn btn-default" ng-click="toBuy.buy(item)">
                <span class="glyphicon glyphicon-ok"></span> Bought
              </button>
            </li>
          </ul>
          <div class="emptyMessage" ng-if="!toBuy.items.length">
            {{toBuy.message}}
          </div>
        </div>
        <!-- Already Bought List -->
        <div class="col-md-6" ng-controller="AlreadyBoughtShoppingController as alreadyBought">
          <h2>Already Bought:</h2>
          <ul>
            <li ng-repeat="item in alreadyBought.items">
              Bought {{item.quantity}} {{item.name}}
            </li>
          </ul>
          <div class="emptyMessage" ng-if="!alreadyBought.items.length">
            {{alreadyBought.message}}
          </div>
        </div>
      </div>
    </div>

  </body>
</html>
(function() {

  angular.
    module('ShoppingListCheckOff', []).
    controller("ToBuyShoppingController", ToBuyShoppingController).
    controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController).
    service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
    toBuy.message = "Everything is bought!";
    toBuy.buy = function (item) {
      ShoppingListCheckOffService.buyItem(item);
    };
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getItemsBought();
    alreadyBought.message = "Nothing bought yet";
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var CATALOG = [{
      name: 'Shirt',
      quantity: 1
    }, {
      name: 'Pizzas',
      quantity: 5
    }, {
      name: 'Jeans',
      quantity: 12
    }, {
      name: 'Muffins',
      quantity: 27
    }, {
      name: 'Shoes',
      quantity: 2
    }];

    var itemsToBuy = CATALOG;
    var itemsBought = [];

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.getItemsBought = function () {
      return itemsBought;
    };

    service.buyItem = function (item) {
      var index = itemsToBuy.indexOf(item);
      if (index !== -1) {
        itemsToBuy.splice(index, 1);
        itemsBought.push(item);
      }
    };
  }

})();

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
