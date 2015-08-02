'use strict';

// Menuitems controller
angular.module('menuitems')
	.controller('MenuitemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Menuitems','GetCategories','GetTypes','GetOptions',
		function($scope, $stateParams, $location, Authentication, Menuitems, GetCategories,GetTypes, GetOptions) {
			$scope.authentication = Authentication;

			// check if user is admin

			$scope.isAdmin=function(){
				if($scope.authentication.user.roles[0]==='admin'){
					return true;
				}else{
					return
					false;
				}
			};

			//*********************************************************//
			//********************Read Query strings************************//
			//*******************************************************//



			//*********************************************************//
			//*******************Initialization***********************//
			//*******************************************************//
			// Call the initialize
			init();

			function init(){
				loadCategories();
				loadTypes();
				loadOptions();
			}

			//*********************************************************//
			//****** Get Categories to fill our Category select*******//
			//*******************************************************//

			function loadCategories() {
				GetCategories.getAllCategories(function (resource, headers) {
					$scope.categories = resource;
					//createMenu();
				});
			}

			//*********************************************************//
			//*********************************************************//


			//*********************************************************//
			//*******************load menu types *********************//
			//*******************************************************//

			function loadTypes() {
				GetTypes.getAllTypes(function (resource, headers) {
					$scope.types = resource;
				});
			}

			//*********************************************************//
			//*********************************************************//

			//*********************************************************//
			//*******************load menu Options *********************//
			//*******************************************************//

			var menuOption={
				item: "",
				name: "",
				price:0,
				spicy: 0
			}
			$scope.menuOptions=[];
			function loadOptions() {
				GetOptions.getAllOptions(function (resource, headers) {

					$scope.menuOptions=resource;
				});
			}

			function optionExists(arrayObj,option){
				for(var i=0;i<arrayObj.length;i++) {
					// is currently selected
					if (option.name === arrayObj[i].name) {
						return i;
					}
				}
				return -1;
			}

			//*********************************************************//
			//*******  check if option already exists ****************//
			//*******************************************************//

			$scope.removeOption=function(option){
				for(var i=0;i<$scope.selectedOptions.length;i++) {
					if (option.name+'-'+option.item === $scope.selectedOptions[i].name+'-'+$scope.selectedOptions[i].item) {
						$scope.selectedOptions.splice(i,1);
					}
				}

			};
		/*	$scope.hasOptionSpicy=false;

			$scope.addSpicyOption=function(item,hasOptionSpicy){
				angular.forEach(item.menuOptions,function(opt,index){
					if($scope.selectedOptions.length>0) {
						var exists = optionExists($scope.selectedOptions, opt);
						if (exists == -1) {
							$scope.selectedOptions.push({
								spicy: hasOptionSpicy
							})
						}
					}else{
						$scope.selectedOptions.push({
							spicy: hasOptionSpicy
						})
					}


				});
			};*/
			$scope.addOption=function(option){
				angular.forEach(option,function(opt,index){
					if($scope.selectedOptions.length>0) {
						var exists = optionExists($scope.selectedOptions, opt);
						if (exists == -1) {
							$scope.selectedOptions.push({
								name: opt.name,
								item: opt.item,
								price: opt.price
							})
						}
					}else{
						$scope.selectedOptions.push({
							name: opt.name,
							item: opt.item,
							price: opt.price
						})
					}
				});

			};


			//*************************************************************************//
			//****************toggle options checkboxes for admin*********************//
			//***********************************************************************//
			$scope.selectedOptions=[];
			// toggle selection for a given option by name
			/*$scope.toggleOptions = function(option) {
			 var exists=optionExists($scope.selectedOptions,option);
			 if($scope.selectedOptions.length>0) {
			 if(exists>-1){
			 $scope.selectedOptions.splice(exists,1);
			 }else {
			 $scope.selectedOptions.push(option);
			 }
			 }else {
			 $scope.selectedOptions.push(option);
			 }
			 };*/

			//*************************************************************************//
			//****************toggle types checkboxes for admin***********************//
			//***********************************************************************//
			$scope.selection = [];
			// toggle selection for a given type by name
			$scope.toggleSelection = function(itemName) {
				var idx = $scope.selection.indexOf(itemName);

				// is currently selected
				if (idx > -1) {
					$scope.selection.splice(idx, 1);
				}

				// is newly selected
				else {
					$scope.selection.push(itemName);
				}
			};

			//*********************************************************//
			//*********************************************************//


			//*********************************************************//
			//****************Create new Menuitem*********************//
			//*******************************************************//

			// Create new Menuitem
			$scope.create = function() {
				// Create new Menuitem object
				var menuitem = new Menuitems();
				menuitem.types=[];
				menuitem.menuOptions=[];
				menuitem.name= this.name;
				menuitem.description=this.description;
				menuitem.price=this.price;
				menuitem.spicy=this.spicy;
				menuitem.category=this.category;
				menuitem.hasOption=this.hasOption;
				menuitem.image=this.image;

				angular.forEach($scope.selection, function (typeName,index) {
					menuitem.types.push({name: typeName});
				});

				angular.forEach($scope.selectedOptions, function (option,index) {
					menuitem.menuOptions.push(option);
				});

				// Redirect after save
				menuitem.$save(function(response) {
					$location.path('menuitems/' + response._id);

					// Clear form fields
					$scope.name = '';
					menuitem.name= '';
					menuitem.description='';
					menuitem.price='';
					menuitem.isSpicy=false;
					menuitem.category='';
					menuitem.hasOption=false;
                    menuitem.spicy=false;
					menuitem.image='';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};

			//*********************************************************//
			//*********************************************************//


			//*********************************************************//
			//****************Remove existing Menuitem****************//
			//*******************************************************//

			$scope.remove = function(menuitem) {
				if ( menuitem ) {
					menuitem.$remove();

					for (var i in $scope.menuitems) {
						if ($scope.menuitems [i] === menuitem) {
							$scope.menuitems.splice(i, 1);
						}
					}
				} else {
					$scope.menuitem.$remove(function() {
						$location.path('menuitems');
					});
				}
			};

			//*********************************************************//
			//*********************************************************//


			//*********************************************************//
			//****************Update existing Menuitem****************//
			//*******************************************************//

			// Update existing Menuitem
			$scope.update = function() {
				var menuitem = $scope.menuitem;
				menuitem.types=[];
				menuitem.menuOptions=[];

				angular.forEach($scope.selection, function (typeName,index) {
					menuitem.types.push({name: typeName});
				});

				angular.forEach($scope.selectedOptions, function (option,index) {
					menuitem.menuOptions.push(option);
				});

				menuitem.$update(function() {
					$location.path('menuitems/' + menuitem._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};


			//*********************************************************//
			//****************Find a list of Menuitems***************//
			//*******************************************************//
			// ////////////////////////////////////////////////////////////////////////////////////////
			///////////////get menu items by category to display menu //////////////////////
			/////////////////////////////////////////////////////////////////////////////////////////

			$scope.find = function() {
				$scope.menuitems = Menuitems.query();

			};

			//*********************************************************//
			//*********************************************************//


			//*********************************************************//
			//****************Find existing Menuitem******************//
			//*******************************************************//
			$scope.selectOptions=[];
			// Find existing Menuitem
			$scope.findOne = function() {
				$scope.menuitem = Menuitems.get({
					menuitemId: $stateParams.menuitemId
				}).$promise.then(function(data){
						$scope.menuitem=data;
						angular.forEach($scope.menuitem.types, function (typeName,index) {
							$scope.selection.push(typeName.name);
						});

						for(var i=0;i< $scope.menuitem.menuOptions.length;i++)
						{
							$scope.selectedOptions.push({
								name:$scope.menuitem.menuOptions[i].name,
								spice:$scope.menuitem.menuOptions[i].spice,
								item:$scope.menuitem.menuOptions[i].item,
								price:$scope.menuitem.menuOptions[i].price
							});
						}
					})
			};

			// Search for a category
			$scope.menuItemSearch = function(menuitem) {
				$location.path('menuitems/' + menuitem._id);
			};
		}
	])
;
