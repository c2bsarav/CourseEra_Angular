(function(){
'use strict';
angular.module('LunchApp',[])
.controller('CheckIfTooMuch_Controller', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.checkIfTooMuch = function(){
    var txtLunchMenuValue = $scope.txtLunchMenu;
    if($scope.istxtLunchMenuValueEmpty(txtLunchMenuValue)){
      $scope.message_LunchStatus = "Please enter data first";
      $scope.message_NonEmptyValue_LunchStatus = "Please enter data first";
      /*
      used with ng-style property
      //if the text box is empty make the color red
      $scope.customColor = {
        "color":"red"
      }
      //setting border color for text box to red

      $scope.customTextBoxBorder={
        "border": "solid 1px red"
      }
      */
      $scope.message_Class = "red";
      $scope.textbox_border = "redBorder";
      return;
    }

    var txtLunchMenuSplitValue = txtLunchMenuValue.split(",");
    var txtLunchMenuSplitCount = txtLunchMenuSplitValue.length;

    /*
    //if the text box is NOT empty make the color green
    $scope.customColor = {
      "color":"green"
    }
    //setting border color for text box to green

    $scope.customTextBoxBorder={
      "border": "solid 1px green"
    }
    */
    $scope.message_Class = "green";
    $scope.textbox_border = "greenBorder";

    if(txtLunchMenuSplitCount > 3){
      $scope.message_LunchStatus = "Too Much";
    }else {
      $scope.message_LunchStatus = "Enjoy!";
    }
    var txtLunchMenuNonEmptyValuesCount = $scope.getCountEliminatingEmptyArrayValues(txtLunchMenuSplitValue);
    if(txtLunchMenuNonEmptyValuesCount > 3){
      $scope.message_NonEmptyValue_LunchStatus = "Too Much";
    }else {
      $scope.message_NonEmptyValue_LunchStatus = "Enjoy!";
    }
  }

  //Function that gets count of array - Eliminates all empty values in an array
  $scope.getCountEliminatingEmptyArrayValues = function(txtLunchMenuSplitValue) {
    var txtLunchMenuSplitCount = txtLunchMenuSplitValue.length;
    var nonEmptyStringCount =0;
    for (var i =0 ; i < txtLunchMenuSplitCount; i++){
      if(!$scope.istxtLunchMenuValueEmpty(txtLunchMenuSplitValue[i])){
        nonEmptyStringCount++;
      }
    }
    return nonEmptyStringCount;
  }

  //checking if a String is Empty
  $scope.istxtLunchMenuValueEmpty = function(txtLunchMenuValue){
    return (!txtLunchMenuValue || 0 === txtLunchMenuValue.length);
  }
}

})();
