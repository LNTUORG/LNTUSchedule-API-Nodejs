/**
 * Created by pupboss on 3/10/16.
 */
'use strict';

var config = require('./config');
var express = require('express');
var useragent = require('express-useragent');
var body_parser = require('body-parser');
var compression = require('compression');
var app = express();

var index = require('./routes/index');
var account = require('./routes/account');
var appl = require('./routes/application');
var cors = require('cors');

app.use(body_parser.urlencoded({ extended: false }));
app.use(useragent.express());
app.use(compression());

app.use(cors());
app.use('/', index);
app.use('/account', account);
app.use('/application', appl);

var server = app.listen(config.port, function () {
  console.log('LNTUSchedule app listening at http://%s:%s', server.address().address, server.address().port);
});
