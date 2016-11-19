/**
 * Created by pupboss on 4/11/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');
var config = require('../config');
var constant = require('../agent/constant');

var analyse_room = function(user_id, password, aid, buildingid, whichweek, week, target, callback) {

  target = target + '?aid=' + aid + '&buildingid=' + buildingid + '&room=-1&whichweek=' + whichweek + '&week=' + week + '&Submit=%C8%B7+%B6%A8';
  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);
    var room_arr = [];
    var total_status_arr = [];
    var info_temp = $('table[class="infolist_tab"]', html).eq(0);
    var class_temp = info_temp.children('tr');
    for (var h = 1; h < class_temp.length; h++) {
      room_arr.push(class_temp.eq(h).children('td').eq(0).text().trim());
    }
    var room_temp = $('table[cellspacing="1"]', html);
    for (var i = 0; i < room_temp.length; i++) {
      var room_status = room_temp.eq(i).children('tr').eq(1).children('td');
      var status_arr = [];
      for (var j = 0; j < room_status.length; j+=2) {
        status_arr.push(room_status.eq(j).text().trim() != '' ? '1' : '0');
      }
      total_status_arr.push(status_arr);
    }
    var temp_dict = {};
    for (var k = 0; k < room_arr.length; k++) {
      temp_dict[room_arr[k]] = total_status_arr[k];
    }

    var dict_arr = [];

    if (aid == 3 && buildingid == 6) {
      for (var l = 0; l < constant.erya_rooms.length; l++) {
        if (!(constant.erya_rooms[l] in temp_dict)) {
          dict_arr.push({name: constant.erya_rooms[l], status: ['0', '0', '0', '0', '0']});
        } else {
          dict_arr.push({name: constant.erya_rooms[l], status: temp_dict[constant.erya_rooms[l]]});
        }
      }
    } else {
      for (var m = 0; m < room_arr.length; m++) {
        dict_arr.push({name: room_arr[m], status: total_status_arr[m]});
      }
    }
    var dict = {};
    dict.firstWeekMondayAt = config.first_week_monday;
    dict.results = dict_arr;
    return callback(null, dict);
  });
};

module.exports = analyse_room;
