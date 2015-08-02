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
		required: 'Please fill Cart name',
		trim: true
	}
	 // option how much spicy
});

/**
 * Cart Schema
 */

var CartSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Cart name',
		trim: true
	},
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
