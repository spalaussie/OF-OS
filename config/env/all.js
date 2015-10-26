'use strict';

module.exports = {
	app: {
		title: 'Online Order',
		description: 'Online Food Ordering System',
		keywords: 'food, catering, dining, delivery, order online, take away'
	},
	port: process.env.PORT || 3001,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'http://fonts.googleapis.com/css?family=Roboto+Slab:400,700',
				'public/modules/core/template/js/masterslider/style/masterslider.css',
				'modules/core/template/js/masterslider/skins/black-2/style.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/bootstrap/dist/js/bootstrap.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-toggle-switch/angular-toggle-switch.min.js',
				'public/lib/bootstrap-toggle/js/bootstrap-toggle.min.js',
				'public/lib/js-cookie/src/js.cookie.js',
				'public/modules/core/template/js/masterslider/masterslider.min.js',
				'public/modules/core/template/js/templatejs/jquery-ui-1.10.4.custom.min.js',
				'public/modules/core/template/js/templatejs/jquery.magnific-popup.min.js',
				'public/modules/core/template/js/templatejs/owl.carousel.js',
				'http://maps.google.com/maps/api/js?sensor=true',
				'public/modules/core/template/js/templatejs/jquery.ui.map.js',
				'public/modules/core/template/js/scripts.js',
				'public/lib/angular-socket-io/socket.min.js'


			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
