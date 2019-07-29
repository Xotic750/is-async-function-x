import toStringTag from 'to-string-tag-x';
import hasToStringTag from 'has-to-string-tag-x';
import normalise from 'normalize-space-x';
import replaceComments from 'replace-comments-x';
import $getPrototypeOf from 'get-prototype-of-x';
import attempt from 'attempt-x';

const isFnRegex = /^async function/;
const {test} = isFnRegex;
const functionCtr = attempt.constructor;
const fToString = functionCtr.toString;
const testRes = attempt(function attemptee() {
  return $getPrototypeOf(functionCtr('return async function() {}')());
});

const supportsAsync = testRes.threw === false;
const asyncProto = testRes.value;

const attemptToString = function attemptToString(fn) {
  return attempt(function attemptee() {
    return normalise(replaceComments(fToString.call(fn), ' '));
  });
};

const compare = function compare(fn) {
  return hasToStringTag ? $getPrototypeOf(fn) === asyncProto : toStringTag(fn) === '[object AsyncFunction]';
};

/**
 * Checks if `value` is classified as an `Async Function` object.
 *
 * @param {*} fn - The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */
const isAsyncFunction = function isAsyncFunction(fn) {
  if (supportsAsync === false || typeof fn !== 'function') {
    return false;
  }

  const result = attemptToString(fn);

  if (result.threw) {
    return false;
  }

  if (test.call(isFnRegex, result.value)) {
    return true;
  }

  return compare(fn);
};

export default isAsyncFunction;
