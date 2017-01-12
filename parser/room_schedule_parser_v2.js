/**
 * Created by pupboss on 4/11/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');
var config = require('../config');
var constant = require('../agent/constant');
var model = require('../utility/db');


var analyse_room = function(aid, buildingid, whichweek, week, target, callback) {

  target = target + '?weeks=' + whichweek + '&buildingid1=' + buildingid;
  agent.agentWithoutCookie(target, function(err, html) {
    if (err) {
      return callback(err, null);
    }

    var $ = cheerio.load(html);
    var room_name_arr = [];
    var total_status_arr = [];
    var total_table_temp = $('table[cellpadding="1"]', html).eq(0);
    var class_temp = total_table_temp.children('tr');

    for (var h = 1; h < class_temp.length; h++) {
      room_name_arr.push(class_temp.eq(h).children('td').eq(0).text().trim());

      var result = class_temp.eq(h).children('td').eq(parseInt(week) + 2).text().trim();
      var temp_arr = ['1', '1', '1', '1', '1'];

      if (result.indexOf('1') < 0) {
        temp_arr[0] = '0';
      }
      if (result.indexOf('2') < 0) {
        temp_arr[1] = '0';
      }
      if (result.indexOf('3') < 0) {
        temp_arr[2] = '0';
      }
      if (result.indexOf('4') < 0) {
        temp_arr[3] = '0';
      }
      if (result.indexOf('5') < 0) {
        temp_arr[4] = '0';
      }
      total_status_arr.push(temp_arr);
    }

    var temp_dict = {};
    for (var k = 0; k < room_name_arr.length; k++) {
      temp_dict[room_name_arr[k]] = total_status_arr[k];
    }

    var dict_arr = [];

    model.building_model.find({ location_id: aid, building_id: buildingid }, function (error, docs) {
      if (error || docs.length == 0) {
        for (var m = 0; m < room_name_arr.length; m++) {
          dict_arr.push({name: room_name_arr[m], status: total_status_arr[m]});
        }
      } else {
        var rooms = docs[0]['rooms'];
        for (var l = 0; l < rooms.length; l++) {
          if (!(rooms[l] in temp_dict)) {
            dict_arr.push({name: rooms[l], status: ['1', '1', '1', '1', '1']});
          } else {
            dict_arr.push({name: rooms[l], status: temp_dict[rooms[l]]});
          }
        }
      }
      var dict = {};
      dict.firstWeekMondayAt = config.first_week_monday;
      dict.results = dict_arr;
      dict.week = whichweek;
      dict.weekday = week;
      return callback(null, dict);
    });
  });
};

module.exports = analyse_room;
