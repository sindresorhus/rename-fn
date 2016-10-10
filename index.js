'use strict';
module.exports = (fn, name) => Object.defineProperty(fn, 'name', {value: name, configurable: true});
