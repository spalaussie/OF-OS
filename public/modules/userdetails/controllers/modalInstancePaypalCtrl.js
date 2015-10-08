'use strict';

// Userdetails controller
angular.module('userdetails').controller('ModalInstancePapalCtrl', ['$scope', '$state', '$modal', '$stateParams', '$location', '$modalInstance', 'order',
  function($scope, $state, $modal, $stateParams, $location,$modalInstance, order) {


  $scope.orderRecieved = order;


  $scope.ok = function () {
     // $state.go('home');
      $modalInstance.dismiss();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.formData      = {};
  $scope.formData.date = "";
  $scope.opened        = false;

  //Datepicker
  $scope.dateOptions = {
    'year-format': "'yy'",
    'show-weeks' : false
  };

  }
]);
