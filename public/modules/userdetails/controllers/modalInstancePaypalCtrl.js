'use strict';

// Userdetails controller
angular.module('userdetails').controller('ModalInstancePapalCtrl', ['$scope', '$state', '$modal', '$stateParams', '$location', '$modalInstance', 'order',
  function($scope, $state, $modal, $stateParams, $location,$modalInstance, order) {


  $scope.orderRecieved = order;


  $scope.ok = function () {
     // $state.go('home');
      $modalInstance.dismiss();
  };
  }
]);
