/**
 * @file Determine if a function is a native aync function.
 * @see {@link https://tc39.github.io/ecma262/#sec-async-function-definitions|14.6 Async Function Definitions}
 * @version 1.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-async-function-x
 */

'use strict';

var toStringTag = require('to-string-tag-x');
var hasToStringTag = require('has-to-string-tag-x');
var normalise = require('normalize-space-x');
var isFnRegex = new RegExp('^async function');
var replaceComments = require('replace-comments-x');
var fToString = Function.prototype.toString;
var $getPrototypeOf = require('get-prototype-of-x');

var asyncProto;
var supportsAsync = false;
try {
  // eslint-disable-next-line no-new-func
  asyncProto = $getPrototypeOf(Function('return async function() {}')());
  supportsAsync = true;
} catch (ignore) {}

/**
 * Checks if `value` is classified as an `Async Function` object.
 *
 * @param {*} fn - The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
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
 * isAsyncFunction(async functin() {}); // true
 */
module.exports = function isAsyncFunction(fn) {
  if (supportsAsync === false || typeof fn !== 'function') {
    return false;
  }

  var str;
  try {
    str = normalise(replaceComments(fToString.call(fn), ' '));
  } catch (ignore) {
    return false;
  }

  if (isFnRegex.test(str)) {
    return true;
  }

  if (hasToStringTag === false) {
    return toStringTag(fn) === '[object AsyncFunction]';
  }

  return $getPrototypeOf(fn) === asyncProto;
};
