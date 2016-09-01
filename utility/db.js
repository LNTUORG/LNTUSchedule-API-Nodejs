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
  building_name : { type: String },
  building_phone : { type: String },
  send_time : { type: String },
  auto_send : { type: String },
  create_at: { type: Date, default: Date.now() }
});

var useless_class_schema = new mongoose.Schema({
  location_id: { type: String },
  location_name: { type: String },
  building_id: { type: String },
  building_name: { type: String },
  class_name : { type: String },
  create_at: { type: Date, default: Date.now() }
});

var user_model = db.model('user', user_schema);
var building_model = db.model('building', building_schema);
var useless_class_model = db.model('useless_class', useless_class_schema);

module.exports = {
  user_model: user_model,
  building_model: building_model,
  useless_class_model: useless_class_model
};
