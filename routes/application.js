/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var constant = require('../agent/constant');
var model = require('../utility/db');

router.post('/config/first-week-monday', function (req, res) {
  if (typeof req.body['first_week_monday'] == 'undefined' || req.body['first_week_monday'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }
  var date_value = req.body['first_week_monday'];
  date_value += 'T00:00:00.000+08:00';

  model.system_config_model.find({ key: constant.config_key.first_week_monday }, function (error, docs) {
    if(error || docs.length < 1){
      model.system_config_model.create({ key: constant.config_key.first_week_monday, value: date_value }, function (error, docs) {
      });
    } else {
      model.system_config_model.update({ key: constant.config_key.first_week_monday }, { key: constant.config_key.first_week_monday, value: date_value, update_at: Date.now() }, function (error, docs) {
      });
    }
  });
  return res.status(204).send();
});

router.get('/config/first-week-monday', function (req, res) {

  model.system_config_model.find({ key: constant.config_key.first_week_monday }, 'key value update_at', function (error, docs) {
    var dict = {
      first_week_monday: docs[0].value
    };
    return res.status(200).json(dict);
  });
});

module.exports = router;
