/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var model = require('../utility/db');
var utility = require('../utility/index');
var agent = require('../agent/dom_agent');
var constant = require('../agent/constant');
var config = require('../config');

router.post('/login', function (req, res) {
  if (typeof req.body['user_id'] == 'undefined' || typeof req.body['password'] == 'undefined' || req.body['user_id'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }
  var user = {
    id: req.body['user_id'],
    login_token: uuid.v4(),
    password: req.body['password'],
    type: '',
    update_at: new Date().toISOString(),
    expires_at: new Date().addDay(30).toISOString(),
    ip_address: req.headers['x-forwarded-for'],
    user_agent: req.useragent['source']
  };
  if (req.body['user_id'] == config.class_admin.user_id) {
    model.user_model.find({ id: config.class_admin.user_id }, function (error, docs) {
      if (user.password != utility.decrypt(docs[0]['password'])){
        return res.status(400).json({ code: constant.cookie.user_error, message: 'password error' });
      } else {
        if (docs[0]['expires_at'] >= new Date()) {
          user.login_token = docs[0]['login_token'];
        }
        user.type = 'CLASS_ADMIN';
        user.password = utility.encrypt(user.password);
        update_user(user);
        res.cookie('auth', user.login_token, { domain: '.schedule.lntu.org', path: '/', maxAge: 270000000 });
        return res.status(200).json(generate_dict(user));
      }
    });
  } else {
    if (req.body['user_id'].length == 10) {
      user.type = 'STUDENT'
    } else {
      user.type = 'TEACHER'
    }
    agent.get_cookie(req.body['user_id'], req.body['password'], function (err) {

      if (err == constant.cookie.user_error) {
        return res.status(400).json({ code: err, message: 'password error' });
      } else if (err == constant.cookie.net_error) {
        return res.status(500).json({ code: err, message: 'The server may be down.' });
      }
      user.password = utility.encrypt(user.password);
      update_user(user);
      return res.status(200).json(generate_dict(user));
    });
  }
});

router.post('/change-password', function (req, res) {
  if (req.body['user_id'] != config.class_admin.user_id) {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'You cant change password' });
  }
  var user = {
    id: req.body['user_id'],
    login_token: uuid.v4(),
    password: req.body['password'],
    type: 'CLASS_ADMIN',
    update_at: new Date().toISOString(),
    expires_at: new Date().addDay(30).toISOString(),
    ip_address: req.headers['x-forwarded-for'],
    user_agent: req.useragent['source']
  };

  model.user_model.find({ id: config.class_admin.user_id }, function (error, docs) {
    if (user.password != utility.decrypt(docs[0]['password'])){
      return res.status(400).json({ code: constant.cookie.user_error, message: 'password error' });
    } else {
      if (req.body['new_password'] == '' || typeof(req.body['new_password'])=="undefined") {
        return res.status(400).json({ code: constant.cookie.args_error, message: 'Args error' });
      }
      user.password = utility.encrypt(req.body['new_password']);
      update_user(user);
      res.cookie('auth', user.login_token, { domain: '.schedule.lntu.org', path: '/', maxAge: 270000000 });
      return res.status(200).json(generate_dict(user));
    }
  });
});

function update_user(user) {
  model.user_model.find({ id: user.id }, function (error, docs) {
    if(error || docs.length < 1){
      user.create_at = new Date().toISOString();
      model.user_model.create(user, function (error, docs) {
      });
    }else{
      model.user_model.update({ id: user.id }, user, function (error, docs) {
      });
    }
  });
}

function generate_dict(user) {
  return {
    user_id: user.id,
    login_token: user.login_token,
    expires_at: user.expires_at,
    user_type: user.type
  }
}

module.exports = router;
