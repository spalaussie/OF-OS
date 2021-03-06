'use strict';

// Options controller
angular.module('menu')
    .controller('MenuController', ['$scope', '$stateParams', '$location', 'Authentication', 'Menuitems','GetCategories','GetTypes','GetOptions','ReturnUrl','CartSvc','GetOrders','Userdetails', 'GetUserDetails',
        function($scope, $stateParams, $location, Authentication, Menuitems, GetCategories,GetTypes, GetOptions,ReturnUrl,CartSvc,GetOrders, Userdetails, GetUserDetails) {
            $scope.authentication = Authentication;
            //Get the user info
            var User=$scope.authentication;

            var deliveryType  = $stateParams.delivery;
            switch(deliveryType){
                case 'Takeaway':
                    $scope.selectedDeliveryType=2;
                    break;
                default:
                    $scope.selectedDeliveryType=1;
                    break;
            }

            //$scope.selectedDeliveryType='1';


            $scope.userOrders=[];
            $scope.isFirstOrder=false;

            function initOrder()
            {
                var order1={};
                order1._id= "";
                order1.completed= false;
                order1.orderno= 0;
                order1.total= 0;
                order1.transactionId= "";
                return order1;
            }

            var order={
                _id: "",
                completed: false,
                accepted:false,
                orderno: 0,
                total: 0,
                transactionId: "",
                order:[]
            };

            function getUserOrders() {
                var userOrders=[];
                if($scope.authentication.user!=="") {
                    $scope.userOrders = GetOrders.query().$promise.then(function (orders) {
                        angular.forEach(orders, function (userOrder) {
                            order=initOrder();
                            if($scope.authentication.user._id===userOrder.user &&
                                userOrder.completed  && userOrder.accepted && userOrder.orderno){
                                    order._id=userOrder._id;
                                    order.completed = userOrder.completed;
                                    order.accepted = userOrder.accepted;
                                    order.orderno=userOrder.orderno;
                                    order.total = userOrder.total;
                                    order.transactionId = userOrder.transactionId;

                                userOrders.push(order);
                            }

                        })

                        $scope.userOrders= userOrders;
                        console.log("Total user Orders",$scope.userOrders.length);

                        if(userOrders.length==0)
                        {
                            $scope.isFirstOrder=true;

                        }else if(userOrders.length >1 && userOrders.length%7==1)
                        {
                            $scope.isEighthOrder=true;
                            var total=0;
                            for(var i= userOrders.length-6;i<userOrders.length;i++){
                                total+=userOrders[i].total;
                            }
                            $scope.eighthOrderDiscount=total/6;
                        }else if(userOrders.length>8) {

                        }
                    });

                }

            }

            //*********************************************************//
            //***********Set the Return URL in cookies ***************//
            //*******************************************************//

            var userDetailsData=[];

            $scope.setUrl=function(){
                if(isOkToSubmit()) {
                    setCart();
                    if (!User.user) {
                        var url='userdetails/0/edit'
                        ReturnUrl.setUrl(url);
                        $location.path(decodeURI(url));
                    }
                    loadUserDetails();

                }
            };


            //*********************************************************//
            //***************Set the Cart in cookies *****************//
            //*******************************************************//
            function setCart(){
                $scope.cart.subTotal=$scope.subTotal;

                $scope.cart.discount=$scope.discount;
                $scope.cart.subTotalDiscount=$scope.subTotalDiscount;

                $scope.cart.firstOrderDiscount=$scope.firstOrderDiscount;
                $scope.cart.subTotalFirstOrderDiscount=$scope.subTotalFirstOrderDiscount;

                $scope.cart.eighthOrderDiscount=$scope.eighthOrderDiscount;
                $scope.cart.subTotalEigthDiscount=$scope.subTotalEigthDiscount;

                $scope.cart.deliveryFee=$scope.deliveryFee;


                if($scope.selectedDeliveryType==1){
                    $scope.cart.Delivery='Delivery';
                }else{
                    $scope.cart.Delivery='Takeaway';
                }
                $scope.cart.Total=$scope.Total;

                CartSvc.setCart($scope.cart);
            }


            //********************************************************//
           //********************Read User Details******************//
          //******************************************************//



            // get the user Details
            function loadUserDetails() {
                GetUserDetails.getAllUserDetails(function (resource, headers) {
                    userDetailsData = resource;
                    checkUserDetails(userDetailsData);
                });
            }

            var locationAddr=[];
            var userDetailsId='';

            function checkUserDetails(userDetails){
                if (User.user && !userDetailsExists(userDetails)) {
                    // if userDetails are not present
                    locationAddr = $scope.cart.Suburb.split(",");
                    create(User.user, locationAddr);

                }
                else{
                    $location.path('userdetails/' + userDetailsId+'/edit');
                }
            }

            function userDetailsExists(userDetails) {
                if (contains(User.user,userDetails)) {
                    return true;
                } else {
                    return false;
                }
            }





            function contains(user, userDetails) {
                var i = userDetails.length;
                while (i--) {
                    if (userDetails[i].user._id === user._id) {
                        userDetailsId=userDetails[i]._id
                        return true;
                    }
                }
                return false;
            }


            // Create new Userdetail for current user
            function create(user, locationAddr) {
                // Create new Userdetail object
                var userdetail = new Userdetails ({
                    first_name: user.firstName,
                    last_name: user.lastName,
                    userName: user.username,
                    email:user.email,
                    suburb:locationAddr[0],
                    zip:locationAddr[1]
                });

                // Redirect after save
                userdetail.$save(function(response) {
                    $location.path('userdetails/' + response._id+'/edit');
                    console.log(response._id);
                    // Clear form fields
                    //$scope.name = '';
                }, function(errorResponse) {
                    console.log(errorResponse.data.message+'222');
                    $scope.error = errorResponse.data.message;
                });
            };



            //*********************************************************//
            //*******************Initialization***********************//
            //*******************************************************//

            $scope.categories=[]; // load all categories
            $scope.types=[];     // load all types

            // Call the initialize
            init();

            function init(){
                getUserOrders();
                loadCategories();
                $scope.selectedSuburb='';
            }
          //  var strMessage=[];
            $scope.errMessage="";
            function isOkToSubmit(){
                var strMessage=[];
                checkSuburb(strMessage);
               // checkDelTime(strMessage);
                checkIfCartEmpty(strMessage)
                checkMinimumOrder(strMessage);
                $scope.errMessage=strMessage[0];

                if($scope.errMessage){
                    return false;

                }
                else{
                    return true;
                }
                /*for(var i=0;i<=strMessage.length-1;i++)
                {
                    $scope.errMessage=$scope.errMessage+strMessage[i];
                }*/
            }

            function checkSuburb(strMessage){
                if($scope.selectedDeliveryType=="1" && (!$scope.selectedSuburb || $scope.selectedSuburb=="") ){
                    strMessage.push("Please select a Suburb.");
                }else if($scope.selectedDeliveryType=="1"&& (!$scope.selectedDelTime || $scope.selectedDelTime=="" )){
                    strMessage.push("Please select delivery time.");
                }else if($scope.selectedDeliveryType=="2"&& (!$scope.selectedDelTime ||$scope.selectedDelTime=="")){
                    strMessage.push("Please select time of pickup.");
                }
                return false;
            }

            function checkIfCartEmpty(strMessage) {
                if ($scope.cart.items.length === 0) {
                    strMessage.push("Please select a food item");
                }
                else {
                    return true;
                }

                return false;
            }

            function checkMinimumOrder(strMessage) {
                if ($scope.subTotal < 32) {
                    strMessage.push("Mimimum Sub Total of $32 excluding delivery fee.");
                }else{
                    return true;
                }

                return false;
            }






            $scope.deliveryTime=getTimeModel(new Date());
           /* $scope.deliveryTime=[{id:1,time:'12:30 AM'},
                                 {id:2,time:'1:30 PM'},
                                 {id:3,time:'2:30 PM'}
                                ];
            */


           function getTimeModel(tmpDate){
                var startHrs=18;
                var endHrs=22;
                var current= tmpDate==null?new Date():tmpDate;
                var currMinute=current.getMinutes()
               if(startHrs<current.getHours()) {
                   startHrs = current.getHours() < startHrs ? startHrs : current.getHours();
                   startHrs = currMinute > 30 ? startHrs + 1 : startHrs
               }
                var timeList= new Array();
                var id=1;
                for(var i=startHrs;i<endHrs;i++){

                    if(currMinute > 30){

                        timeList.push({id: id,time:i-12+":30 PM"});currMinute=0;
                    }else{
                        timeList.push({id:id,time:i-12 +":00 PM"});
                        timeList.push({id:id,time:i-12 +":30 PM"});

                    }
                    id++;
                }
                return timeList;
            }
            $scope.selectedDelTime="";


            $scope.suburbs = {
                options: [
                            {
                                id: 1, suburb: "Harris Park, 2150", fee:5
                            },
                            {
                                id: 2, suburb: "MAYS HILL, 2145", fee:0
                            },
                            {
                                id: 3, suburb: "MERRYLANDS, 2160", fee:2
                            },
                            {
                                id: 4, suburb: "NORTHMEAD, 2152", fee:4
                            },
                            {
                                id: 5, suburb: "PARRAMATTA, 2150", fee:4
                            }, {
                                id: 6, suburb: "PENDLE HILL, 2145", fee:5
                            },
                            {
                                id: 7, suburb: "SOUTH WENTWORTHVILLE, 2145", fee:4
                            },
                            {
                                id: 8, suburb: "WENTWORTHVILLE, 2145", fee:0
                            },
                            {
                                id: 9, suburb: "WESTMEAD, 2145", fee:0
                            }
                        ]
                };

            $scope.deliveryType={
            options:[
                    {
                        id:1, type: 'Delivery'
                    },
                    {
                        id:2, type: 'Takeaway'
                    }
                ]
            };




            $scope.updateCartWithSuburb=function(){
                $scope.cart.Suburb=$scope.selectedSuburb;
                //$scope.deliveryFee=sub;
                angular.forEach($scope.suburbs.options,function(opt,index){
                    if(opt.suburb===$scope.selectedSuburb){
                        $scope.deliveryFee=opt.fee;
                    }
                })
                calculateTotal();
            };




             $scope.changeDeliveryType = function(deliveryType){
                 $scope.selectedDeliveryType = deliveryType.id;

                 $scope.cart.Delivery = deliveryType.type;


             };

//******************************************************************************************************************//
            //*******************************************************ShoppingCart**********************************************//
            //****************************************************************************************************************//

            /*Cart total*/
            $scope.subTotal=0;
            $scope.discount=0;
            $scope.Total=0;
            $scope.deliveryFee=0;
            $scope.subTotalDiscount=0;

            $scope.firstOrderDiscount=0;
            $scope.subTotalFirstOrderDiscount=0;
            $scope.eighthOrderDiscount=0;
            $scope.subTotalEigthDiscount=0;

            $scope.selectedSpicy=2;

            $scope.Total=$scope.subTotal+$scope.deliveryFee;
           // $scope.spicy=["Mild", "Medium", "Hot"];

            $scope.spicyOption = {
                options: [{
                    id: 1,
                    text: "Mild",
                    imgSrc:"modules/core/template/img/content/mild.png",
                    isOption: "false"
                }, {
                    id: 2,
                    text: "Medium",
                    imgSrc:"modules/core/template/img/content/medium.png",
                    isOption: "true"
                }, {
                    id: 3,
                    text: "Hot",
                    imgSrc:"modules/core/template/img/content/hot.png",
                    isOption: "false"
                }]
            };


            $scope.selectedOption='';

            $scope.getSelectedOption=function(option,optionName){
                $scope.selectedOption=optionName;
                $scope.optionPrice=option.price;
            };

            $scope.qty=1;
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
                        if(item.spicy) {
                            cartItem.Spicy = $scope.getSpicy($scope.selectedSpicy);
                        }
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

            $scope.getSelectedSpicy=function(spicId){
                $scope.selectedSpicy=spicId;
            };

            $scope.getSpicy=function(spicId){
                switch(spicId) {
                    case 1:
                        return 'mild';
                        break;
                    case 2:
                        return 'medium';
                        break;
                    case 3:
                        return 'hot';
                        break;
                    default:
                        return 'medium';
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
                        calculateTotal($scope.cart.items);
                    }else{ // if Item count is one then remove the item from the cart
                        $scope.cart.items[index].Qty -= 1;
                        $scope.cart.items[index].Total -= cartItem.Price;
                        calculateTotal($scope.cart.items);
                        $scope.cart.items.splice(index,1);
                    }
                }
            };


            //*********************************************************//
            //*********************** Calculate Total ****************//
            //*******************************************************//

            function calculateTotal(items){
                if(items) {
                    $scope.cart.Total=0;
                    $scope.Total=0;

                    angular.forEach(items, function (item) {

                        $scope.cart.Total += item.Total;
                    })
                }
                $scope.subTotal=$scope.cart.Total;

                if($scope.isEighthOrder) {
                }else{
                    $scope.discount = .20 * $scope.subTotal;
                    $scope.subTotalDiscount = $scope.subTotal - $scope.discount;
                }

                if($scope.isFirstOrder){
                    $scope.firstOrderDiscount=.20*$scope.subTotalDiscount;
                    $scope.subTotalFirstOrderDiscount=$scope.subTotalDiscount-$scope.firstOrderDiscount;
                    $scope.Total=$scope.deliveryFee+$scope.subTotal-$scope.discount-$scope.firstOrderDiscount;
                }else if($scope.isEighthOrder){
                    $scope.subTotalEigthDiscount=$scope.subTotal-$scope.eighthOrderDiscount;
                    $scope.Total=$scope.deliveryFee+$scope.subTotal-$scope.discount-$scope.eighthOrderDiscount;
                }else{
                    $scope.Total=$scope.deliveryFee+$scope.subTotal-$scope.discount;
                }


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
