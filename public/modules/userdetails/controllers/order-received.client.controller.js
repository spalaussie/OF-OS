'use strict';

// Userdetails controller
angular.module('userdetails').controller('OrderRecievedController', ['$scope', '$stateParams', '$location', 'Authentication', 'Userdetails','GetUserDetails','CartSvc','Orders',
    function($scope, $stateParams, $location, Authentication, Userdetails,GetUserDetails, CartSvc, Orders) {
        $scope.authentication = Authentication;
        //$scope.sa="sasasasasas";



        loadCartObject();

        var cart;
        function loadCartObject(){
            cart = CartSvc.getCart();
            if (cart) {
                //var returnUrl = returnUrl.getUrl();
                $scope.Cart = JSON.parse(cart);
                //$scope.Cart.userDetailsID=userDetailsUserId;
                CartSvc.setCart($scope.Cart);
                $scope.delivery=$scope.Cart.Delivery
                $scope.orderRecieved = Orders.get({
                 orderId: $scope.Cart.orderId
                 });
            }
        }



// Find existing Userdetail
        $scope.findOne = function() {
            $scope.userdetail = Userdetails.get({
                userdetailId: '5603db74c5d021181cb5759a'
            });
        };
    }
]);
