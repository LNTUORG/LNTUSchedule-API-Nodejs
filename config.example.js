/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var config = {
  port: 3001, // 本地端口号
  first_week_monday: '2016-08-29T00:00:00.000+08:00', // 每学期的第一个周一，每学期都需要手动改一次
  server_name: 'Aliyun-Node', // 服务器名字，选填
  secret_key: 'wv6GC3iMpUJa', // 加盐

  db: {
    uri: 'mongodb://name:pass@localhost:27017/db' // 数据库地址
  },
  admin: {  // 用来抓取数据的测试账号，必须能登陆上教务在线
    user_id: 'xxx',
    password: 'xxx'
  },
  class_admin: {
    user_id: 'class_admin', // 该系统不允许注册，只有这一个用户名
    phone: '13218080906' // 管理员电话，用来接受报警通知
  }
};

module.exports = config;
