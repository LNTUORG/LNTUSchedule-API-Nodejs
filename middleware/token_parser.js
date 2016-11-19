/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var model = require('../utility/db');
var utility = require('../utility');
var constant = require('../agent/constant');
var config = require('../config');

module.exports = function (req, res, next) {
  if (config.debug) {
    next();
  } else {
    var authorization = '';
    if (!req.headers.authorization && !req.cookies) {
      res.status(401).json({ code: constant.cookie.auth_error, message: 'Authorization is null.' });
    }
    else if (req.headers.authorization) {
      authorization = req.headers.authorization;
    } else {
      authorization = req.cookies.auth;
    }
    model.user_model.find({ login_token: authorization }, function (error, docs) {
      req.lntu_user_id = '';
      req.lntu_password = '';
      req.lntu_type = '';

      if (error || docs.length < 1){
        res.status(401).json({ code: constant.cookie.auth_error, message: 'Authorization is invalid.' });
      } else if (docs[0]['expires_at'] < new Date()) {
        res.status(401).json({ code: constant.cookie.auth_error, message: 'Authorization is expires.' });
      } else {
        req.lntu_type = docs[0]['type'];
        req.lntu_password = utility.decrypt(docs[0]['password']);
        req.lntu_user_id = docs[0]['id'];
        next();
      }
    });
  }
};
