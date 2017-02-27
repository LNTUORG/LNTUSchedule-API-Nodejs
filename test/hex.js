var utility = require('../utility');
var config = require('../config');
var moment = require('moment');
var superagent = require('superagent');
// var crypto = require('crypto');

// console.log(utility.parse_hex('110110000100001100000000101000000000000000000110110000100001100000000101000000000000000000110110000101110100000000110000000000000000000110110000101110100000000110000000000000000000110000000001000100000000000000000000000000000'));
utility.send_sms();
// console.log(crypto.createHash('md5').update('lntu_schedule').digest('hex'));
// console.log(Math.ceil(8 / 7));
// var start_date = moment(config.first_week_monday).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
// var days = moment().diff(start_date, 'days');
// console.log(days);
// superagent
//   .get('https://api.lgdjwc.com/v1/room-schedule?location_id=3&building_id=14&week=2&week_day=1')
//   .timeout(3000000)
//   .end(function(err, res) {
//     if (err) {
//     	console.log(err);
//       return callback(constant.cookie.net_error, null);
//     }
//     var result = res.body;
//     console.log(result);
//     // return callback(null, result);
//   });