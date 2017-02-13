/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var config = require('../config');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var db = mongoose.connect(config.db.uri);

db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

var user_schema = new mongoose.Schema({
  id: { type: String },
  login_token: { type: String },
  password: { type: String },
  type: { type: String },
  update_at: { type: Date, default: Date.now() },
  expires_at: { type: Date },
  create_at: { type: Date },
  ip_address: { type: String },
  user_agent: { type: String }
});

var building_schema = new mongoose.Schema({
  location_id: { type: String },
  location_name: { type: String },
  building_id: { type: String },
  building_name: { type: String },
  building_phone: { type: String },
  manager_phone: {type: String},
  auto_send: { type: Boolean },
  rooms: {type: Array},
  create_at: { type: Date, default: Date.now() }
});

var sms_log_schema = new mongoose.Schema({
  sms_content: { type: String },
  building_name: { type: String },
  phone_num: { type: String},
  room_status: mongoose.Schema.Types.Mixed,
  create_at: { type: Date, default: Date.now() }
});

var system_config_schema = new mongoose.Schema({
  key: {type: String},
  value: {type: String},
  updated_at: { type: Date, default: Date.now() }
});

var user_model = db.model('user', user_schema);
var building_model = db.model('building', building_schema);
var sms_log_model = db.model('sms_log', sms_log_schema);
var system_config_model = db.model('system_config', system_config_schema);

module.exports = {
  user_model: user_model,
  building_model: building_model,
  sms_log_model: sms_log_model,
  system_config_model: system_config_model
};
