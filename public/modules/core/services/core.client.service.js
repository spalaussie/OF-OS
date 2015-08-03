'use strict';
// URL service used for managing  Return Url
angular.module('core').
    factory('ReturnUrl', function(){

    var obj = {},
        URL={
            returnUrl:null
        };

    obj.setUrl = function(url) {
      //  $cookieStore.put('returnUrl', url);
        Cookies.set('returnUrl', url);
        //URL.returnUrl=url;
    };
    obj.getUrl = function() {
        URL.returnUrl = Cookies.get('returnUrl');
        Cookies.remove('returnUrl');
        return URL.returnUrl;
    };

    return obj;
});

// Cart service used for managing  Cart
angular.module('core').
    factory('CartSvc', function(){

        var obj = {},
            Cart={
                cartItem:{}
            };

        obj.setCart = function(cart) {
            //  $cookieStore.put('returnUrl', url);
            Cookies.set('cartItem', cart);
            //URL.returnUrl=url;
        };
        obj.getCart = function() {
            Cart.cartItem = Cookies.get('cartItem');
            //Cookies.remove('cartItem');
            return Cart.cartItem;
        };

        return obj;
    });
