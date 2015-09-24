'use strict';

// Userdetails controller
angular.module('userdetails').controller('OrderRecievedController', ['$scope', '$stateParams', '$location', 'Authentication', 'Userdetails','GetUserDetails','CartSvc','Orders',
    function($scope, $stateParams, $location, Authentication, Userdetails,GetUserDetails, CartSvc, Orders) {
        $scope.authentication = Authentication;


        loadCartObject();

        var cart;
        function loadCartObject(){
            cart = CartSvc.getCart();
            if (cart) {
                //var returnUrl = returnUrl.getUrl();
                $scope.Cart = JSON.parse(cart);
                $scope.Cart.userDetailsID=userDetailsUserId;
                CartSvc.setCart($scope.Cart);
                $scope.delivery=$scope.Cart.Delivery
            }
        }



// Find existing Userdetail
        $scope.findOne = function() {
            $scope.userdetail = Userdetails.get({
                userdetailId: $stateParams.userdetailId
            });
        };
    }
]);
