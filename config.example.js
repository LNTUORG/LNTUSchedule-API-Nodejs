/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var config = {
  debug: false, // debug 模式，慎用
  port: 3001, // 本地端口号
  server_name: 'Aliyun-Node', // 服务器名字，选填
  secret_key: 'wv6GC3iMpUJa', // 加盐，必须修改，稍微复杂点不能太长
  auto_send: false, // 自动发送

  db: {
    uri: 'mongodb://name:pass@localhost:27017/db' // 数据库地址
  },
  class_admin: {
    user_id: 'class_admin', // 该系统不允许注册，只有这一个用户名
    sms_user_name: '', // 短信宝账户用户名
    sms_password: '' // 短信宝密码
  }
};

module.exports = config;
