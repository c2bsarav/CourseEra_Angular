(function () {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['fave', 'UserService', 'ApiPath'];
  function MyInfoController(fave, UserService, ApiPath) {
    var $ctrl = this;

    $ctrl.fave = fave;

    $ctrl.user = UserService.getUser();
    $ctrl.signed = UserService.isSigned();

    $ctrl.basePath = ApiPath;

    $ctrl.isSigned = function () {
      return ($ctrl.signed);
    }

    $ctrl.$onInit = function () {
      console.log("Fave: ");
      console.log($ctrl.fave);
    }

  }

})();
