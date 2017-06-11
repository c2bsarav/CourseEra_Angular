(function () {
  "use strict";

  angular.module('common')
  .service('UserService', UserService);


  UserService.$inject = ['$http', 'ApiPath'];
  function UserService($http, ApiPath) {
    var service = this;

    service.user = {};

    service.$onInit = function () {
      service.user.firstName = "";
      service.user.lastName = "";
      service.user.email = "";
      service.user.phone = "";
      service.user.fave = "";
    }

    service.signed = false;

    service.isSigned = function () {
      return service.signed;
    }

    service.getFaveItem = function () {
      return $http.get(ApiPath + '/menu_items/' + service.user.fave + '.json').then(function (response) {
        return response.data;
      })
      .catch( function (error) {
        console.log(error);
      });
    };

    service.getFaveItems = function () {
      return $http.get(ApiPath + '/menu_items.json?category=' + service.user.fave).then(function (response) {
        return response.data;
      })
      .catch( function (error) {
        console.log(error);
      });
    };

    service.getUser = function () {
      return service.user;
    }

    service.saveUser = function (newUser) {
      service.user = newUser;
    };
  }

})();
