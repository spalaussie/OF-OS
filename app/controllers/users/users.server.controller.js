'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Update user details
 */

exports.getUserByID = function(req, res, next, id) {
    User.findById(id).populate('user', 'email').exec(function(err, user) {
        if (err) return next(err);
        if (! user) return next(new Error('Failed to load User ' + id));
        req.user = user ;
        next();
    });
};
