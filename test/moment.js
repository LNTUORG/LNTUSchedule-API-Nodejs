// var config = require('../config');
var moment = require('moment');
// var model = require('../utility/db');


// var start_date = moment(config.first_week_monday).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
// var days = moment().diff(start_date, 'days');
// console.log(days);

// model.sms_log_model.find({ }, function (err, docs) {
//   var doc_array = [];
//   docs.forEach(function (item) { 
//     console.log(moment(item.create_at).format());
//     item.create_at = moment(item.create_at).format();
//     doc_array.push(item);
//   });
//   console.log(doc_array);
// })

console.log((new Date()).getTime());
