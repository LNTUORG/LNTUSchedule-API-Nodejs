/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var config = {
  port: 3001,
  first_week_monday: '2016-08-29T00:00:00.000+08:00',
  server_name: 'Aliyun-Node',
  secret_key: 'Hbk8hweurh4Dj',

  db: {
    uri: 'mongodb://name:pass@localhost:27017/db'
  },
  admin: {
    enable: true,
    user_id: 'xxx',
    password: 'xxx'
  },
  class_admin: {
    user_id: 'class_admin'
  }
};

module.exports = config;
