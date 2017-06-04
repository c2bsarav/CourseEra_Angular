(function () {
  'use strict';
  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$q' ,'$http', 'ApiBasePath']
   function MenuDataService($q, $http, ApiBasePath) {
     var service = this;

     service.getAllCategories = function () {
       var promise = $http( {method:"GET" , url: (ApiBasePath + "/categories.json")});
       promise.then(function (response) {
         return response.data;
       }).catch(function (error) {
         console.log(error);
       });
       return promise;
     }
     service.getItemsForCategory = function (categoryShortName) {
       var promise = $http({method:"GET", url: (ApiBasePath + "/menu_items.json")
                     , params:{ category: categoryShortName } });
       promise.then(function (response) {
         return response.data.menu_items;
       }).catch(function (error) {
         console.log(error);
       });
       return promise;
     };
   }
})();
