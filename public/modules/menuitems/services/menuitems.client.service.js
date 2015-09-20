'use strict';

//Menuitems service used to communicate Menuitems REST endpoints
angular.module('menuitems').factory('Menuitems', ['$resource',
	function($resource) {
		return $resource('menuitems/:menuitemId', { menuitemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])

	.factory('GetCategories', ['$resource',
		function($resource) {
			var resource;
			resource=$resource('/categories',null,{
				getAllCategories:{
					method:'GET',
					isArray:true
				}
			});
			return resource;
	}])
	.factory('GetTypes', ['$resource',
		function($resource) {
			var resource;
			resource=$resource('/types',null,{
				getAllTypes:{
					method:'GET',
					isArray:true
				}
			});
			return resource;
		}])

	.factory('GetOptions', ['$resource',
		function($resource) {
			var resource;
			resource=$resource('/options',null,{
				getAllOptions:{
					method:'GET',
					isArray:true
				}
			});
			return resource;
		}])

	.factory('GetOrders', ['$resource',
		function($resource) {
			var resource;
			resource=$resource('/orders',null,{
				getOrders:{
					method:'GET',
					isArray:true
				}
			});
			return resource;
		}])
;
