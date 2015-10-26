'use strict';

module.exports = {
	db: 'mongodb://localhost/myfirstmeanapp-dev',
	app: {
		title: 'MyFirstMeanApp - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1478158852478422',
		clientSecret: process.env.FACEBOOK_SECRET || 'fd53cc8417c6f18aa2b5ef4f5ac399d1',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'onlinerajmahal@gmail.com',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'gmail',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'onlinerajmahal@gmail.com',
				pass: process.env.MAILER_PASSWORD || 'sandeep2972'
			}
		}
	}
};
