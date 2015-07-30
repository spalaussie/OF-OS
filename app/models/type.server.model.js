'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength (v) {
	// a custom validation function for checking string length to be used by the model
	return v.length > 5;
}


/**
 * Category Schema
 */
var TypeSchema = new Schema({
	// Category model fields
	// ...
	name: {
		type: String,
		default: '',
		trim: true,
		unique : true,
		// make this a required field
		required: 'name cannot be blank',
		// wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
		validate: [validateLength, 'name must be 5 chars in length or more']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Type', TypeSchema);
