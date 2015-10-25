/**
 * Created by admin on 11/10/2015.
 */
'use strict';

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketFactory',
    function(socketFactory) {
        return socketFactory({
            prefix: '',
            //ioSocket: io.connect('http://dev.rajmahalonline.com.au')
            ioSocket: io.connect('localhost:3001')
        });
    }
]);
