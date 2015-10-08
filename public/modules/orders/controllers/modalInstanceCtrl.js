'use strict';

// Userdetails controller
angular.module('userdetails').controller('ModalInstanceCtrl', ['$scope','$http', '$state', '$modal', '$stateParams', '$location', '$modalInstance', 'order',
  function($scope,$http, $state, $modal, $stateParams, $location,$modalInstance, order) {


  $scope.orderRecieved = order;


  $scope.ok = function () {
    sendEmail($scope.orderRecieved);
      $state.go('home');
      $modalInstance.dismiss();
  };


    // Submit forgotten password account id
    function sendEmail(order) {
      $scope.success = $scope.error = null;

     /* $http.post('/userdetails/sendEmail', order).success(function(response) {
        // Show user success message and clear form
        /!* $scope.credentials = null;
         $scope.success = response.message;

         }).error(function(response) {
         // Show user error message and clear form
         $scope.credentials = null;*!/
        $scope.error = response.message;
        console.log($scope.error);
      });*/
    }


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
