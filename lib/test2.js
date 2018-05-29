'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  _ejs2.default.render('./template.ejs', {
    text: 'component测试案例2'
  });
};

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }