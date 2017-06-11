(function () {
"use strict";

angular.module('public')
.component('signUpItem', {
  templateUrl: 'src/public/sign-up/sign-up-item.html',
  bindings: {
    item: '<',
    setFave: '&'
  },
  controller: SignItemController
});

SignItemController.$inject = ['ApiPath'];
function SignItemController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;

  $ctrl.fave = function (myItem) {
    console.log(myItem);
    $ctrl.setFave({ fave: myItem });
  }
}


})();
