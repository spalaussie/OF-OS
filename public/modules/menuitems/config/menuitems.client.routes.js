'use strict';

//Setting up route
angular.module('menuitems').config(['$stateProvider',
	function($stateProvider) {
		// Menuitems state routing
		$stateProvider.
		state('listMenuitems', {
			url: '/menuitems:type',
			templateUrl: 'modules/menuitems/views/list-menuitems.client.view.html'
		}).
		state('createMenuitem', {
			url: '/menuitems/create',
			templateUrl: 'modules/menuitems/views/create-menuitem.client.view.html'
		}).
		state('viewMenuitem', {
			url: '/menuitems/:menuitemId',
			templateUrl: 'modules/menuitems/views/view-menuitem.client.view.html'
		}).
		state('editMenuitem', {
			url: '/menuitems/:menuitemId/edit',
			templateUrl: 'modules/menuitems/views/edit-menuitem.client.view.html'
		});
	}
]);
