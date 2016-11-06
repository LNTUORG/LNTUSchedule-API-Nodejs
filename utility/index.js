/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var config = require('../config');
var model = require('./db');
var room_schedule_parser_v2 = require('../parser/room_schedule_v2');
var constant = require('../agent/constant');
var moment = require('moment');
var async = require('async');
var request = require('request');

var crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = config.secret_key;

function encrypt(text){
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function parse_hex(binary_str) {
  var result = '';
  while (binary_str.length % 3 != 0) {
    binary_str += '0';
  }
  for (var i = 0; i < binary_str.length / 3; i++) {
    var temp_str = binary_str.substring(i * 3, (i + 1) * 3);
    var sum = 0;
    for (var j = 0; j < 3; j++) {
      sum +=  temp_str[j] * Math.pow(2, 2 - j);
    }
    result += sum;
  }
  return result;
}

Date.prototype.addDay = function (num) {

  this.setDate(this.getDate() + parseInt(num));
  return this;
};

function capture_a_building(building, callback) {
  var date = new Date();
  var week_day = date.getDay();
  week_day = week_day == 0 ? 7 : week_day;

  var start_date = moment(config.first_week_monday).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  var days = moment().diff(start_date, 'days');
  var week = Math.ceil(days / 7);

  room_schedule_parser_v2(config.admin.user_id, config.admin.password, building.location_id, building.building_id, week, week_day, 'teacher/teachresource/roomschedule_week.jsdo', function (err, result) {
    if (err != null) {
      console.log(building.location_id, building.building_id);
      var f_url = 'http://api.smsbao.com/sms?u=lntu_schedule&p=abf7ff8b340a3936f4419dcadc49abd4&m=' + config.class_admin.phone + '&c=' + building.building_name + '短信发送失败,因为教务处网站过于卡顿,请手动发送';
      request(f_url, function (error, response, body) {

      });
      callback(null, building);
      return;
    }
    var str = '';
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < result.results.length; j++) {
        var arr = result.results[j].status;
        str = str + arr[i];
      }
    }
    var url = 'http://api.smsbao.com/sms?u=lntu_schedule&p=abf7ff8b340a3936f4419dcadc49abd4&m=' + building.building_phone + '&c=' + parse_hex(str);
    request(url, function (error, response, body) {

    });
    callback(null, null);
  })
}

function send_sms_with_buildings(docs) {
  async.mapLimit(docs, 1, function (doc, callback) {
    capture_a_building(doc, callback);
  }, function (err, results) {
  });
}

var send_sms = function () {
  model.building_model.find({auto_send: '1'}, function (error, docs) {
    if(error || docs.length < 1){
      return;
    } else {
      send_sms_with_buildings(docs);
    }
  })
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  parse_hex: parse_hex,
  send_sms: send_sms
};
