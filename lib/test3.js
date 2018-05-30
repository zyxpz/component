'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./test2.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestDomThree = function TestDomThree(props) {
  var _props$text = props.text,
      text = _props$text === undefined ? 'react测试' : _props$text;


  return _react2.default.createElement(
    'div',
    { className: 'g-color g-border' },
    text
  );
};

exports.default = TestDomThree;