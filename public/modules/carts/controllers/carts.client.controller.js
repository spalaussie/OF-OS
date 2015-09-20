'use strict';

// Carts controller
angular.module('carts')
	.controller('CartsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Carts','Userdetails','CartSvc','Appsettings','Order',
	function($scope, $stateParams, $location, Authentication, Carts,Userdetails, CartSvc, Appsettings) {
		$scope.authentication = Authentication;

		$scope.cart= JSON.parse(CartSvc.getCart());

		$scope.settings=Appsettings.query().$promise.then(function(data) {
			var settings = data;
			angular.forEach(settings, function(item){
				switch(item.name){
					case 'business':
						$scope.appValues.business=item.value;
						break;
					case 'country':
						$scope.appValues.country=item.value;
						break;
					case 'currency_code':
						$scope.appValues.currency_code=item.value;
						break;
					case 'shipping':
						$scope.appValues.shipping=item.value;
						break;
					case 'return':
						$scope.appValues.return=item.value;
						break;
					case 'tax':
						$scope.appValues.tax=item.value;
						break;
					case 'cccharge':
						$scope.appValues.cccharge=item.value;
						break;
				}
			})
		});

		$scope.appValues={
			business:'',
			country:'',
			currency_code:'',
			shipping:'',
			return:''
		}

		$scope.itemName="Online Food Order at Rajmahal";
		$scope.itemNumber=1001;
		$scope.email=$scope.authentication.user.email;

		// Find a list of Userdetails
			$scope.findUserDetails = function() {
				$scope.userdetails = Userdetails.get({
                    userdetailId: $scope.cart.userDetailsID
                });
			};




		// Create new Cart
		$scope.create = function() {
			// Create new Cart object
			var cart = new Carts ({
				name: this.name
			});

			// Redirect after save
			cart.$save(function(response) {
				$location.path('carts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Cart
		$scope.remove = function(cart) {
			if ( cart ) { 
				cart.$remove();

				for (var i in $scope.carts) {
					if ($scope.carts [i] === cart) {
						$scope.carts.splice(i, 1);
					}
				}
			} else {
				$scope.cart.$remove(function() {
					$location.path('carts');
				});
			}
		};

		// Update existing Cart
		$scope.update = function() {
			var cart = $scope.cart;

			cart.$update(function() {
				$location.path('carts/' + cart._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Carts
		$scope.find = function() {
			$scope.carts = Carts.query();
		};

		// Find existing Cart
		$scope.findOne = function() {
			$scope.cart = Carts.get({ 
				cartId: $stateParams.cartId
			});
		};
	}
])


	/*.directive('dropdownMulti', function(){
		return {
			restrict: 'E',
			scope: {
				model: '=',
				options: '='
				},
			template: "<div class='btn-group' data-ng-class='{open: open}'>" +
						"<button class='btn btn-small'>Select...</button>" +
						"<button class='btn btn-small dropdown-toggle'data-ng-click='openDropdown()'>"+
							"<span class='caret'></span>" +
						"</button>"+
						"<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
							"<li><a data-ng-click='selectAll()'>"+
								"<span class='fa fa-check green'	aria-hidden='true'></span> Check All</a>" +
							"</li>" +
							"<li><a data-ng-click='deselectAll();'>"+
								"<span class='fa fa-times red' aria-hidden='true'></span> Uncheck All</a>" +
							"</li>" +
							"<li class='divider'></li>" +
							"<li data-ng-repeat='option in options'>"+
								"<a data-ng-click='toggleSelectItem(option)'>"+
								"<span data-ng-class='getClassName(option)'	aria-hidden='true'></span> {{option.name}}</a>" +
							"</li>" +
						"</ul>" +
					"</div>",
		controller: function ($scope) {
			$scope.openDropdown = function () {
				$scope.open = !$scope.open;
			};

			$scope.selectAll = function () {
				$scope.model = [];
				angular.forEach($scope.options, function (item, index) {
					$scope.model.push(item.id);
				});
			};

			$scope.deselectAll = function () {
				$scope.model = [];
			};

			$scope.toggleSelectItem = function (option) {
				var intIndex = -1;
				angular.forEach($scope.model, function (item, index) {
					if (item == option.id) {
						intIndex = index;
					}
				});

				if (intIndex >= 0) {
					$scope.model.splice(intIndex, 1);
				}
				else {
					$scope.model.push(option.id);
				}
			};

			$scope.getClassName = function (option) {
				var varClassName = 'glyphicon glyphicon-remove red';
				angular.forEach($scope.model, function (item, index) {
					if (item == option.id) {
						varClassName = 'glyphicon glyphicon-ok green';
					}
				});
				return (varClassName);
			};
		}
	}
})*/
;
