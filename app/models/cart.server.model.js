'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

 var Items= new Schema({
	name: {
		type: String,
		default: '',
		trim: true
	}
	 // option how much spicy
});

/**
 * Cart Schema
 */

var CartSchema = new Schema({

	orderNumber: {
		type: Number
	},
	Total: {
		type: Number
	},
	created: {
		type: Date,
		default: Date.now
	},
	items:[Items],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Cart', CartSchema);
