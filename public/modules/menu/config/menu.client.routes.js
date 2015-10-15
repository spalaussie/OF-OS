'use strict';

// Setting up route
angular.module('menu').config(['$stateProvider',
	function($stateProvider) {
		// Menu state routing
		$stateProvider.
		state('listMenu', {
			url: '/menu?type',
			templateUrl: 'modules/menu/views/list-menu.client.view.html'
		});
	}
]);
