'use strict';

// Carts controller
angular.module('carts')
	.controller('CartsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Carts',
	function($scope, $stateParams, $location, Authentication, Carts) {
		$scope.authentication = Authentication;

		$scope.colors = [{name: 'black',shade: 'dark'},{name: 'white',shade: 'light'},{name: 'red',shade: 'dark'},{name: 'blue',shade: 'dark'},{name: 'yellow', shade: 'light'}
		];
		$scope.selectedColors=[];
		angular.forEach($scope.colors, function(color,index){
			if(index==1 || index==3){
				$scope.selectedColors.push({
					name:color.name,
					shade:color.shade
				})
			}
		});



		$scope.selectedColors1=[];


		for(var i=0;i< $scope.colors.length;i++)
		{
			if(i==1 || i==3){
				$scope.selectedColors1.push($scope.colors[i]);
			}
		}
		//$scope.selectedColors = [$scope.colors[2],$scope.colors[1]];

		$scope.doCustom=function() {
			$('#myselection').select2();
		};


		$scope.users = [
			{ "id": 1, "name": "Ali" },
			{ "id": 2, "name": "Sara" },
			{ "id": 3, "name": "Babak" },
			{ "id": 4, "name": "Sanaz" },
			{ "id": 5, "name": "Dariush" }
		];

		$scope.selectedUserIds = [1,3, 5];


		// Create new Cart
		/*$scope.create = function() {
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
		};*/
	}
])


	.directive('dropdownMulti', function(){
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
})
;
