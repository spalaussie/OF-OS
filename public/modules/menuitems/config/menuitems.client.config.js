'use strict';

// Configuring the Articles module
angular.module('menuitems').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Menuitems', 'menuitems', 'dropdown', '/menuitems(/create)?');
		Menus.addSubMenuItem('topbar', 'menuitems', 'List Menuitems', 'menuitems');
		Menus.addSubMenuItem('topbar', 'menuitems', 'New Menuitem', 'menuitems/create');
	}
]);