'use strict';

exports.__esModule = true;
exports['default'] = observableFromStore;

var _rx = require('rx');

function observableFromStore(store) {
  return _rx.Observable.create(function (observer) {
    return store.subscribe(function () {
      return observer.onNext(store.getState());
    });
  });
}

module.exports = exports['default'];