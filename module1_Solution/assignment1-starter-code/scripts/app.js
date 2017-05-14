(function(){
//'use strict';
angular.module('LunchApp',[])
.controller('CheckIfTooMuch_Controller', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.checkIfTooMuch = function(){
    var txtLunchMenuValue = $scope.txtLunchMenu;
    if(istxtLunchMenuValueEmpty(txtLunchMenuValue)){
      $scope.message_LunchStatus = "Please enter data first";
      $scope.message_NonEmptyValue_LunchStatus = "Please enter data first";
      //if the text box is empty make the color red
      $scope.customColor = {
        "color":"red"
      }
      //setting border color for text box to red
      $scope.customTextBoxBorder={
        "border": "solid 1px red"
      }
      return;
    }

    var txtLunchMenuSplitValue = txtLunchMenuValue.split(",");
    var txtLunchMenuSplitCount = txtLunchMenuSplitValue.length;

    //if the text box is NOT empty make the color green
    $scope.customColor = {
      "color":"green"
    }
    //setting border color for text box to green
    $scope.customTextBoxBorder={
      "border": "solid 1px green"
    }
    if(txtLunchMenuSplitCount > 3){
      $scope.message_LunchStatus = "Too Much";
    }else {
      $scope.message_LunchStatus = "Enjoy!";
    }
    var txtLunchMenuNonEmptyValuesCount = getCountEliminatingEmptyArrayValues(txtLunchMenuSplitValue);
    if(txtLunchMenuNonEmptyValuesCount > 3){
      $scope.message_NonEmptyValue_LunchStatus = "Too Much";
    }else {
      $scope.message_NonEmptyValue_LunchStatus = "Enjoy!";
    }

  }
  //Function that gets count of array - Eliminates all empty values in an array
  getCountEliminatingEmptyArrayValues = function(txtLunchMenuSplitValue) {
    var txtLunchMenuSplitCount = txtLunchMenuSplitValue.length;
    var nonEmptyStringCount =0;
    for (var i =0 ; i < txtLunchMenuSplitCount; i++){
      if(!istxtLunchMenuValueEmpty(txtLunchMenuSplitValue[i])){
        nonEmptyStringCount++;
      }
    }
    return nonEmptyStringCount;
  }
  //checking if a String is Empty
  istxtLunchMenuValueEmpty = function(txtLunchMenuValue){
      return (!txtLunchMenuValue || 0 === txtLunchMenuValue.length);
  }
}

})();
