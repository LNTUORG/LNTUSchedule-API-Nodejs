/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var constant = {
  cookie: {
    net_error: 'REMOTE_INVOKE_ERROR',
    user_error: 'PASSWORD_ERROR',
    auth_error: 'AUTH_ERROR',
    args_error: 'ARGS_ERROR'
  },
  urls: [
    'http://60.18.131.131:11080/academic/',
    'http://60.18.131.131:11081/academic/',
    'http://60.18.131.131:11180/academic/',    //*
    'http://60.18.131.131:11181/academic/',
    'http://60.18.131.131:11080/newacademic/', //*
    'http://60.18.131.131:11081/newacademic/',
    'http://60.18.131.133:11180/newacademic/' //*
  ],
  hex_map: {
    '00000': '0',
    '00001': '1',
    '00010': '2',
    '00011': '3',
    '00100': '4',
    '00101': '5',
    '00110': '6',
    '00111': '7',
    '01000': '8',
    '01001': '9',
    '01010': 'a',
    '01011': 'b',
    '01100': 'c',
    '01101': 'd',
    '01110': 'e',
    '01111': 'f',
    '10000': 'g',
    '10001': 'h',
    '10010': 'i',
    '10011': 'j',
    '10100': 'k',
    '10101': 'l',
    '10110': 'm',
    '10111': 'n',
    '11000': 'o',
    '11001': 'p',
    '11010': 'q',
    '11011': 'r',
    '11100': 's',
    '11101': 't',
    '11110': 'u',
    '11111': 'v'
  }
};

module.exports = constant;
