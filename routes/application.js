/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var agent = require('../agent/dom_agent');
var constant = require('../agent/constant');
var model = require('../utility/db');

router.get('/auto-fix', function (req, res) {

  agent.test_speed(function (content) {
    return res.send(content);
  });
});

router.post('/config/first-week-monday', function (req, res) {
  if (typeof req.body['first_week_monday'] == 'undefined' || req.body['first_week_monday'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }
  var date_value = req.body['first_week_monday'];

  model.system_config_model.find({ key: constant.config_key.first_week_monday }, function (error, docs) {
    if(error || docs.length < 1){
      model.system_config_model.create({ key: constant.config_key.first_week_monday, value: date_value }, function (error, docs) {
      });
    } else {
      model.system_config_model.update({ key: constant.config_key.first_week_monday }, { key: constant.config_key.first_week_monday, value: date_value }, function (error, docs) {
      });
    }
  });
  return res.status(204).send();
});

router.post('/config/login-test-info', function (req, res) {
  if (typeof req.body['admin_user_id'] == 'undefined' || req.body['admin_user_id'] == '' || typeof req.body['admin_password'] == 'undefined' || req.body['admin_password'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }

  var admin_user_id = req.body['admin_user_id'];
  var admin_password = req.body['admin_password'];
  model.system_config_model.find({ key: constant.config_key.admin_user_id }, function (error, docs) {
    if(error || docs.length < 1){
      model.system_config_model.create({ key: constant.config_key.admin_user_id, value: admin_user_id }, function (error, docs) {
      });
    } else {
      model.system_config_model.update({ key: constant.config_key.admin_user_id }, { key: constant.config_key.admin_user_id, value: admin_user_id }, function (error, docs) {
      });
    }
  });
  model.system_config_model.find({ key: constant.config_key.admin_password }, function (error, docs) {
    if(error || docs.length < 1){
      model.system_config_model.create({ key: constant.config_key.admin_password, value: admin_password }, function (error, docs) {
      });
    } else {
      model.system_config_model.update({ key: constant.config_key.admin_password }, { key: constant.config_key.admin_password, value: admin_password }, function (error, docs) {
      });
    }
  });
  return res.status(204).send();
});

module.exports = router;
