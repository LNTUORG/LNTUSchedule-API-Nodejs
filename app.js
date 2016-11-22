/**
 * Created by pupboss on 3/10/16.
 */
'use strict';

var config = require('./config');
var express = require('express');
var useragent = require('express-useragent');
var body_parser = require('body-parser');
var compression = require('compression');
var token_parser = require('./middleware/token_parser');
var schedule = require('node-schedule');
var utility = require('./utility');
var cookie_parser = require('cookie-parser');
var request = require('request');
var app = express();

var index = require('./routes/index');
var account = require('./routes/account');
var appl = require('./routes/application');
var room_schedule = require('./routes/room_schedule');
var cors = require('cors');

app.use(body_parser.urlencoded({ extended: false }));
app.use(useragent.express());
app.use(compression());

app.use(cors());
app.use('/', index);
app.use('/account', account);
app.use('/application', appl);

app.use(cookie_parser());
app.use(token_parser);
app.use('/room', room_schedule);

var server = app.listen(config.port, function () {
  console.log('LNTUSchedule app listening at http://%s:%s', server.address().address, server.address().port);
});

if (config.auto_send) {
  var auto_send = schedule.scheduleJob('0 1 2 * * *', function (){
    utility.send_sms();
  });
}

var auto_fix = schedule.scheduleJob('*/10 * * * *', function () {
  request('http://localhost:' + server.address().port + '/application/auto-fix', function (error, response, body) {
    console.log(body);
  });
});
