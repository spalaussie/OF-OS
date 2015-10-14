'use strict';

// Carts controller
angular.module('carts')
	.controller('CartsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Carts',
	function($scope, $stateParams, $location, Authentication, Carts) {
		$scope.authentication = Authentication;
	}
]);

