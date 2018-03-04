/**
 * Created by pupboss on 4/11/16.
 */
'use strict';

var constant = require('../agent/constant');
var model = require('../utility/db');
var superagent = require('superagent');

var by = function(name){
  return function(o, p){
    var a, b;
    if (typeof o === "object" && typeof p === "object" && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    }
    else {
      throw ("error");
    }
  }
}

var analyse_room = function(aid, buildingid, whichweek, week, callback) {

  superagent
    .get('https://api.lgdjwc.com/v1/room-schedule?location_id=' + aid + '&building_id=' + buildingid + '&week=' + whichweek + '&week_day=' + week)
    .timeout(3000000)
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }

      var dict = {};
      dict.results = res.body.results;
      dict.results.sort(by("name"));
      dict.week = whichweek;
      dict.weekday = week;
      model.system_config_model.find({ key: constant.config_key.first_week_monday }, function (error, docs) {
        if(error || docs.length < 1){
          return callback(constant.cookie.args_error, null);
        } else {
          dict.first_week_monday_at = docs[0].value;
          return callback(null, dict);
        }
      });
    });
};

module.exports = analyse_room;
