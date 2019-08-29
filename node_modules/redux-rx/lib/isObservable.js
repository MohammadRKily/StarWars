'use strict';

exports.__esModule = true;
exports['default'] = isObservable;

var _rx = require('rx');

function isObservable(val) {
  return val instanceof _rx.Observable;
}

module.exports = exports['default'];