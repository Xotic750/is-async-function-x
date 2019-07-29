import toStringTag from 'to-string-tag-x';
import hasToStringTag from 'has-to-string-tag-x';
import normalise from 'normalize-space-x';
import replaceComments from 'replace-comments-x';
import $getPrototypeOf from 'get-prototype-of-x';
import attempt from 'attempt-x';
var isFnRegex = /^async function/;
var test = isFnRegex.test;
var functionCtr = attempt.constructor;
var fToString = functionCtr.toString;
var testRes = attempt(function attemptee() {
  return $getPrototypeOf(functionCtr('return async function() {}')());
});
var supportsAsync = testRes.threw === false;
var asyncProto = testRes.value;

var attemptToString = function attemptToString(fn) {
  return attempt(function attemptee() {
    return normalise(replaceComments(fToString.call(fn), ' '));
  });
};

var compare = function compare(fn) {
  return hasToStringTag ? $getPrototypeOf(fn) === asyncProto : toStringTag(fn) === '[object AsyncFunction]';
};
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

  var result = attemptToString(fn);

  if (result.threw) {
    return false;
  }

  if (test.call(isFnRegex, result.value)) {
    return true;
  }

  return compare(fn);
};

export default isAsyncFunction;

//# sourceMappingURL=is-async-function-x.esm.js.map