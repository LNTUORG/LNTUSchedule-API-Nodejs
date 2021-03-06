/**
 * Created by pupboss on 11/5/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

var room_schedule_parser_v2 = require('../parser/room_schedule_parser_v2');
var lntu_building = require('../parser/lntu_building');
var constant = require('../agent/constant');
var config = require('../config');
var model = require('../utility/db');


router.post('/v2/room-schedule', function (req, res) {
  var location_id = req.body['location_id'];
  var building_id = req.body['building_id'];
  var week = req.body['week'];
  var week_day = req.body['week_day'];

  if (parseInt(week) > 26 || parseInt(week) < 1 || parseInt(week_day) < 1 || parseInt(week_day) > 7) {
    return res.status(400).json({ code: constant.cookie.args_error, message: '' });
  }
  room_schedule_parser_v2(location_id, building_id, week, week_day, function (err, result) {
    if (err) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  })
});

router.post('/v1/lntu-building', function (req, res) {
  if (typeof req.body['location_name'] == 'undefined' || typeof req.body['rooms'] == 'undefined' || typeof req.body['auto_send'] == 'undefined' || typeof req.body['building_name'] == 'undefined' || typeof req.body['building_phone'] == 'undefined' || typeof req.body['location_id'] == 'undefined' || typeof req.body['building_id'] == 'undefined' || req.body['building_id'] == '' || req.body['building_name'] == '' || req.body['building_phone'] == '' || req.body['location_id'] == '' || req.body['auto_send'] == '' || req.body['location_name'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }
  var rooms_json = req.body['rooms'];
  var rooms_arr = [];
  if (rooms_json.length > 0) {
    rooms_arr = JSON.parse(req.body['rooms']);
  }
  var building = {
    location_id: req.body['location_id'],
    location_name: req.body['location_name'],
    building_id: req.body['building_id'],
    building_name: req.body['building_name'],
    building_phone: req.body['building_phone'],
    manager_phone: req.body['manager_phone'],
    rooms: rooms_arr,
    auto_send: req.body['auto_send']
  };
  model.building_model.find({ building_id: req.body['building_id'], location_id: req.body['location_id'] }, function (error, docs) {
    if(error || docs.length < 1){
      model.building_model.create(building, function (error, docs) {
      });
    } else {
      building.rooms = docs[0].rooms;
      model.building_model.update({ building_id: req.body['building_id'], location_id: req.body['location_id'] }, building, function (error) {
      });
    }
    return res.status(204).send();
  });
});

router.put('/v1/lntu-building', function (req, res) {
  if (typeof req.body['location_name'] == 'undefined' || typeof req.body['rooms'] == 'undefined' || typeof req.body['auto_send'] == 'undefined' || typeof req.body['building_name'] == 'undefined' || typeof req.body['building_phone'] == 'undefined' || typeof req.body['location_id'] == 'undefined' || typeof req.body['building_id'] == 'undefined' || req.body['building_id'] == '' || req.body['building_name'] == '' || req.body['building_phone'] == '' || req.body['location_id'] == '' || req.body['auto_send'] == '' || req.body['location_name'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }
  var rooms_json = req.body['rooms'];
  var rooms_arr = [];
  if (rooms_json.length > 0) {
    rooms_arr = JSON.parse(req.body['rooms']);
  }
  var building = {
    location_id: req.body['location_id'],
    location_name: req.body['location_name'],
    building_id: req.body['building_id'],
    building_name: req.body['building_name'],
    building_phone: req.body['building_phone'],
    manager_phone: req.body['manager_phone'],
    rooms: rooms_arr,
    auto_send: req.body['auto_send']
  };
  model.building_model.find({ building_id: req.body['building_id'], location_id: req.body['location_id'] }, function (error, docs) {
    if(error || docs.length < 1){
      model.building_model.create(building, function (error, docs) {
      });
    } else {
      building.rooms = docs[0].rooms;
      model.building_model.update({ building_id: req.body['building_id'], location_id: req.body['location_id'] }, building, function (error) {
      });
    }
    return res.status(204).send();
  });
});

router.delete('/v1/lntu-building', function (req, res) {
  if (typeof req.body['location_id'] == 'undefined' || typeof req.body['building_id'] == 'undefined' || req.body['building_id'] == '' || req.body['location_id'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }
  model.building_model.remove({ building_id: req.body['building_id'], location_id: req.body['location_id'] }, function (error) {
    if (error) {
      return res.status(500).json({ code: constant.cookie.net_error, message: 'The server may be down.' });
    }
    return res.status(204).send();
  });
});

router.get('/v1/lntu-building', function (req, res) {
  model.building_model.find({ }, function (error, docs) {
    return res.status(200).json(docs);
  });
});

router.get('/v1/lntu-location-from-system', function (req, res) {

  lntu_building.analyse_location(function (err, result) {
    if (err) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  });
});

router.get('/v1/lntu-building-from-system', function (req, res) {
  var location_id = req.query['location_id'];
  if (location_id == '' ||  typeof location_id == 'undefined') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'location_id can not be null' });
  }
  lntu_building.analyse_building(location_id, function (err, result) {
    if (err) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  });
});

router.get('/v1/lntu-room-from-system', function (req, res) {
  var location_id = req.query['location_id'];
  var building_id = req.query['building_id'];
  if (location_id == '' ||  typeof location_id == 'undefined' || building_id == '' ||  typeof building_id == 'undefined') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'location_id or building_id can not be null' });
  }
  lntu_building.analyse_room(location_id, building_id, function (err, result) {
    if (err) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  });
});

router.get('/v1/sms-log', function (req, res) {
  var cpp = req.query['cpp'];
  var page = req.query['page'];
  if (cpp == '' ||  typeof cpp == 'undefined' || page == '' ||  typeof page == 'undefined') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'cpp or page can not be null' });
  }
  cpp = parseInt(cpp);
  page = parseInt(page);
  model.sms_log_model.count({}, function(err, count){
    var page_count = Math.ceil(count / cpp);
    model.sms_log_model.find({ }, function (err, docs) {
      var dict = {
        cpp: cpp,
        page: page,
        page_count: page_count,
        data:docs
      };
      res.send(dict);
    }).sort({ _id: -1 }).skip(cpp * (page - 1)).limit(cpp);
  });
});

module.exports = router;
