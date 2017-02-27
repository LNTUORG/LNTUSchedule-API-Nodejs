/**
 * Created by pupboss on 7/24/16.
 */
'use strict';

var superagent = require('superagent');
var constant = require('../agent/constant');

var analyse_location = function(callback) {

  superagent
    .get('https://api.lgdjwc.com/v1/lntu-location-from-system')
    .timeout(3000000)
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }
      return callback(null, res.body);
    });
};

var analyse_building = function(location_id, callback) {

  superagent
    .get('https://api.lgdjwc.com/v1/lntu-building-from-system?location_id=' + location_id)
    .timeout(3000000)
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }
      return callback(null, res.body);
    });
};

var analyse_room = function(location_id, building_id, callback) {

  superagent
    .get('https://api.lgdjwc.com/v1/lntu-room-from-system?location_id=' + location_id + '&building_id=' + building_id)
    .timeout(3000000)
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }
      return callback(null, res.body);
    });
};


module.exports = {
  analyse_location: analyse_location,
  analyse_building: analyse_building,
  analyse_room: analyse_room
};