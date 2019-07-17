var _this = this;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

import toStringTag from 'to-string-tag-x';
import hasToStringTag from 'has-to-string-tag-x';
import normalise from 'normalize-space-x';
import replaceComments from 'replace-comments-x';
import $getPrototypeOf from 'get-prototype-of-x';
import attempt from 'attempt-x';
var isFnRegex = /^async function/;
var test = isFnRegex.test;
var functionCtr = attempt.constructor;
var fToString = functionCtr.prototype.toString;
var testRes = attempt(function () {
  _newArrowCheck(this, _this);

  return $getPrototypeOf(functionCtr('return async function() {}')());
}.bind(this));
var supportsAsync = testRes.threw === false;
var asyncProto = testRes.value;
/**
 * Checks if `value` is classified as an `Async Function` object.
 *
 * @param {*} fn - The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */

var isAsyncFunction = function isAsyncFunction(fn) {
  if (supportsAsync === false || typeof fn !== 'function') {
    return false;
  }

  var str;

  try {
    str = normalise(replaceComments(fToString.call(fn), ' '));
  } catch (ignore) {
    return false;
  }

  if (test.call(isFnRegex, str)) {
    return true;
  }

  if (hasToStringTag === false) {
    return toStringTag(fn) === '[object AsyncFunction]';
  }

  return $getPrototypeOf(fn) === asyncProto;
};

export default isAsyncFunction;

//# sourceMappingURL=is-async-function-x.esm.js.map