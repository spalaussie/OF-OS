'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



/**
 * Type Schema
 */

var Type = new Schema({
	// Category model fields
	// ...
	name: {
		type: String,
		default: ''
	}
});

var Option = new Schema({
	// Category model fields
	// ...
	name: {
		type: String,
		default: ''
	},
    item:{
        type:String
    },
	spicy:{
		type:Boolean,
		default:false
	},
	price:{
		type:Number,
		default:0
	}
});

/**
 * Menuitem Schema
 */
var MenuitemSchema;
MenuitemSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Menuitem name',
        trim: true
    },
    description: {
        type: String,
        default: '',
        required: 'Description is required',
        trim: true
    },
    hasOption: {
        type: Boolean,
        default: false
    },
    isSpicy: {
        type: Boolean,
        default: false
    },
    spicy: {
        type: Boolean,
        default: ""
    },
    category: {
        type: String,
        default: '',
        required: 'category is required',
        trim: true
    },
    price: {
        type: Number,
        min: 0,
        default: '',
        required: 'Price is required',
        trim: true
    },
    image: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    types: [Type],
    menuOptions: [Option],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Menuitem', MenuitemSchema);
