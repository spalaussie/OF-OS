'use strict';

// Options controller
angular.module('menu')
    .controller('MenuController', ['$scope', '$stateParams', '$location', 'Authentication', 'Menuitems','GetCategories','GetTypes','GetOptions','ReturnUrl',
        function($scope, $stateParams, $location, Authentication, Menuitems, GetCategories,GetTypes, GetOptions,ReturnUrl) {
            $scope.authentication = Authentication;

            $scope.setUrl=function(url){
                ReturnUrl.setUrl(url);
                $location.path(decodeURI(url));
            };


            //*********************************************************//
            //********************Read Query strings************************//
            //*******************************************************//



            //*********************************************************//
            //*******************Initialization***********************//
            //*******************************************************//

            $scope.categories=[]; // load all categories
            $scope.types=[];     // load all types

            // Call the initialize
            init();

            function init(){
                loadCategories();
               // loadTypes();
               // loadOptions();
              $scope.deliveryType = 'delivery';
            }
            $scope.areas =
                [
                    "Westmead",
                    "Wentworthville",
                    "Parramatta",
                    "Pendel Hill"
                ];
             $scope.changeStatus = function(deliveryType){
                 $scope.deliveryType = deliveryType;
                     $scope.cart.Delivery = deliveryType;
             }

//******************************************************************************************************************//
            //*******************************************************ShoppingCart**********************************************//
            //****************************************************************************************************************//

            /*Cart total*/
            $scope.Total=0;
            $scope.selectedSpicy;
            $scope.spicy=["Mild", "Medium", "Hot"];
            /* create an item for the cart */

            $scope.cart={
                Delivery:'',
                Suburb:'',
                items:[],
                Total:0.00
            };
            var cartItem={
                Name:'',       // Name of the itemQty:0,        // Quantity of the Item
                Price:0.00,  // Price of Item
                Option:'', // option ie. Half/Full, 4 pieces/ 6 pieces
                Spicy:'' // option how much spicy
            };

           /* var cartItem={
                Name:'',       // Name of the item
                Qty:0,        // Quantity of the Item
                Price:0.00,  // Price of Item
                Option:'', // option ie. Half/Full, 4 pieces/ 6 pieces
                Spicy:'', // option how much spicy
                Delivery:'',
                Suburb:'',
                Total:0.00

            };*/
            /* initialise the cart */
            /* initialise the cart */
            function initCart()
            {
                cartItem={};
                cartItem.Name='';
                cartItem.Qty = 0,
                cartItem.Price = 0.00,
                cartItem.Option = '',
                cartItem.Spicy = ''
                return cartItem;

                /*var menuByCategory1={};
                 menuByCategory1.Name='';
                 menuByCategory1.Type='';
                 menuByCategory1.Order='';
                 menuByCategory1.Items=[];
                 return menuByCategory1;*/
            }


            /* Cart */
            //$scope.cart=[];

           // var cartItem={};
            $scope.addItem=function(Qty,item,option){

                var cartItem=initCart();
                if(Qty>0 && !option) {
                    var idx=cartItemExists($scope.cart.items,item);
                    if ( idx== -1) {
                        cartItem.Name = item.name;
                        cartItem.Qty=Qty; // get the Qty to to cart for items Total calculation
                        cartItem.Price = item.price; // get the price to the cart  for items Total calculation
                        cartItem.Spicy=item.spicy;
                        //cartItem.Option = option;
                        cartItem.Total=  Qty*item.price; //calculate particular items Total

                        $scope.cart.items.push(cartItem); //add to thr cart
                    }else{
                        cartItem=$scope.cart.items[idx];
                        var qty=parseInt(cartItem.Qty)+parseInt(Qty);
                        cartItem.Qty=qty;
                        //cartItem.Spicy=item.spicy;
                        cartItem.Total=  qty*cartItem.Price;
                    }

                    //$scope.cart.push(cartItem);
                }else{
                    var idx=cartOptionExists($scope.cart.items,option);
                    if ( idx== -1) {
                        cartItem.Qty=1;
                        cartItem.Name = option.item+" "+option.name;
                        //cartItem.Spicy=option.spicy;
                        cartItem.Price = option.price; // get the price to the cart  for items Total calculation
                        cartItem.Total=  option.price; //calculate particular items Total

                        $scope.cart.items.push(cartItem); //add to thr cart
                    }else{
                        cartItem=$scope.cart.items[idx];
                        var qty=parseInt(cartItem.Qty)+1;
                        cartItem.Qty=qty;
                        //cartItem.Spicy=option.spicy;
                        cartItem.Total=  qty*cartItem.Price;
                    }
                }

                // calculate the cart total
                calculateTotal($scope.cart.items);
            };

            $scope.getSpicy=function(item,spicy){
                if(item.length>0) {
                    angular.forEach(item, function (it, index) {
                        opt.spicy = spicy;
                    })
                } else{
                    item.spicy=spicy;
                }
            };


            //*********************************************************//
            //******* Remove the item from the Cart ****************//
            //*******************************************************//
            $scope.removeItem=function(cartItem){
                var index =cartItemExists($scope.cart.items,cartItem);
                if(index>-1) {
                    if($scope.cart.items[index].Qty>=2) { // check if item count is one. if it is greater than 1 then just decrease the Quantity by 1.
                        $scope.cart.items[index].Qty -= 1;
                        $scope.cart.items[index].Total -= cartItem.Price;
                        calculateTotal($scope.cart);
                    }else{ // if Item count is one then remove the item from the cart
                        $scope.cart.items[index].Qty -= 1;
                        $scope.cart.items[index].Total -= cartItem.Price;
                        calculateTotal($scope.cart);
                        $scope.cart.items.splice(index,1);
                    }
                }
            };


            //*********************************************************//
            //*********************** Calculate Total ****************//
            //*******************************************************//

            function calculateTotal(items){
                $scope.cart.Total=0;
                angular.forEach(items,function(item){

                    $scope.cart.Total+=item.Total;
                })
                $scope.Total=$scope.cart.Total;
            }

            //*********************************************************//
            //*******  check if option already exists ****************//
            //*******************************************************//

            function cartItemExists(arrayObj,option){
                for(var i=0;i<arrayObj.length;i++) {
                    // is currently selected
                    if (option.name === arrayObj[i].Name) {
                        return i;
                    }else if(option.Name === arrayObj[i].Name){
                        return i;
                    }
                }
                return -1;
            }

            function cartOptionExists(arrayObj,option){
                for(var i=0;i<arrayObj.length;i++) {
                    // is currently selected
                    if (arrayObj[i].Name===option.item+" "+option.name) {
                        return i;
                    }else if(option.Name === arrayObj[i].Name){
                        return i;
                    }
                }
                return -1;
            }
            //*****************************************888888888888888888888****************//
            //*******Redirect to the new location regardless of its anchor name************//
            //****************************************************************************//

            $scope.linkTo = function(id) {
                $location.url(id);
            };

            //*********************************************************//
            //****************Alert Business open time*********************//
            //*******************************************************//

            $scope.isBuzTime=function() {

                var startTime = '17:00:00';
                var endTime = '22:00:00';

                var currentTime = new Date();

                var hours = currentTime.getHours();
                var minutes = currentTime.getMinutes();
                var seconds = currentTime.getSeconds();

                var currTime = hours + ":" + minutes + ":" + seconds;

                if (currTime > startTime && currTime < endTime) {
                    return true;
                }
                else {
                    return false;
                }
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
            //****************initialize menuByCategory***************//
            //*******************************************************//

            function initialize()
            {
                var menuByCategory1={};
                menuByCategory1.Name='';
                menuByCategory1.Type='';
                menuByCategory1.Order='';
                menuByCategory1.Items=[];
                return menuByCategory1;
            }

            //*********************************************************//
            //*********************************************************//


            //*********************************************************//
            //****************Find a list of Menuitems***************//
            //*******************************************************//
            // ////////////////////////////////////////////////////////////////////////////////////////
            ///////////////get menu items by category to display menu //////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////

            var menuByCategory={
                Name:'',
                Type:'',
                Order:'',
                Items:[]
            };
            $scope.menuByCategoryItems=[];

            $scope.find = function() {
                var tmpItems;
                var menuByCategoryItems=[];
                $scope.menuitems = Menuitems.query()
                    .$promise.then(function(data){
                        $scope.menuitems= data;
                        tmpItems=data;

                        angular.forEach($scope.categories,function(cat){
                            menuByCategory=initialize();
                            //console.log("CAtegory",cat);
                            menuByCategory.Name = cat.name;
                            menuByCategory.Type = cat.type;
                            menuByCategory.Order = cat.order;

                            angular.forEach(tmpItems,function(item) {

                                if(cat.name===item.category) {
                                    menuByCategory.Items.push(item);
                                    //$scope.roleList.concat(newRole);
                                }
                                //console.log(index);
                            });
                            menuByCategoryItems.push(menuByCategory);
                            //console.log("MyenuByCategory",menuByCategory);
                        });

                        $scope.menuByCategoryItems =menuByCategoryItems;
                        //console.log('menuByCategoryItems: ',$scope.menuByCategoryItems);
                    });
                //console.log($scope.menuItems);
                //console.log($scope.menuByCategoryItems);
            };



        }
])
//*********************************************************//
    //*************unique filter for categories***************//
    //*******************************************************//

    .filter('unique', function() {
        return function(collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function(item) {
                var key = item[keyname];
                if(keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };
    })
//*********************************************************//
//*********************************************************//

    .directive('buttonToggle', function(){
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, elem, attrs) {
                var drop= $('.dropdown-option');
                drop.hide();
                //console.log(elem);
                elem.bind('click', function() {
                    //drop.children().enable();
                    elem.toggleClass("active");
                    elem.parent().parent().next()
                        .slideToggle(300);
                    elem.parent().parent()
                        .toggleClass('red');
                });
            }

        }
    })


;
