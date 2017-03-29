/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-async-function-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/is-async-function-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-async-function-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-async-function-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-async-function-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-async-function-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-async-function-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-async-function-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Determine if a function is a native aync function.
 *
 * Requires ES3 or above.
 *
 * @see {@link https://tc39.github.io/ecma262/#sec-async-function-definitions|14.6 Async Function Definitions}
 *
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-async-function-x
 */

/* eslint strict: 1, max-statements: 1, no-new-func: 1 */

/* global module */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var toStringTag = require('to-string-tag-x');
  var hasToStringTag = require('has-to-string-tag-x');
  var isNull = require('lodash.isnull');
  var s = require('white-space-x').ws;
  var x = '^[' + s + ']*async[' + s + ']+(?:function)?';
  var isFnRegex = new RegExp(x);
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var fToString = Function.prototype.toString;

  var $getPrototypeOf = Object.getPrototypeOf || function getPrototypeOf(object) {
    // eslint-disable-next-line no-proto
    var proto = object.__proto__;
    if (proto || isNull(proto)) {
      return proto;
    } else if (toStringTag(object.constructor) === '[object Function]') {
      return object.constructor.prototype;
    } else if (object instanceof Object) {
      return Object.prototype;
    } else {
      return null;
    }
  };

  var getAF = function getAsyncFunc() {
    if (!hasToStringTag) {
      return false;
    }
    try {
      return new Function('return async function() {}')();
    } catch (ignore) {}
    return false;
  };
  var asyncFunc = getAF();
  var AsyncFunction = asyncFunc ? $getPrototypeOf(asyncFunc) : {};

  /**
   * Checks if `value` is classified as an `Async Function` object.
   *
   * @param {*} fn The value to check.
   * @return {boolean} Returns `true` if `value` is correctly classified,
   * else `false`.
   * @example
   * var isAsyncFunction = require('is--async-function-x');
   *
   * isAsyncFunction(); // false
   * isAsyncFunction(Number.MIN_VALUE); // false
   * isAsyncFunction('abc'); // false
   * isAsyncFunction(true); // false
   * isAsyncFunction({ name: 'abc' }); // false
   * isAsyncFunction(function () {}); // false
   * isAsyncFunction(new Function ()); // false
   * isAsyncFunction(function* test1() {}); // false
   * isAsyncFunction(function test2(a, b) {}); // false
   * isAsyncFunction(class Test {}); // false
   * isAsyncFunction((x, y) => {return this;}); // false
   * isAsyncFunction(async functin() {}); // false
   */
  module.exports = function isAsyncFunction(fn) {
    if (typeof fn !== 'function') {
      return false;
    }
    if (isFnRegex.test(fToString.call(fn).replace(STRIP_COMMENTS, ' '))) {
      return true;
    }
    if (!hasToStringTag) {
      return toStringTag(fn) === '[object AsyncFunction]';
    }
    return $getPrototypeOf(fn) === AsyncFunction;
  };
}());
