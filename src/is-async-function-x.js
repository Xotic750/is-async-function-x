import toStringTag from 'to-string-tag-x';

import hasToStringTag from 'has-to-string-tag-x';
import {normalizeSpace2018 as normalise} from 'normalize-space-x';
import replaceComments from 'replace-comments-x';
import $getPrototypeOf from 'get-prototype-of-x';
import attempt from 'attempt-x';

const isFnRegex = /^async function/;
const {test} = isFnRegex;

const functionCtr = function() {}.constructor;
const fToString = functionCtr.prototype.toString;

const testRes = attempt(function() {
  return $getPrototypeOf(functionCtr('return async function() {}')());
});

const supportsAsync = testRes.threw === false;
const asyncProto = testRes.value;

/**
 * Checks if `value` is classified as an `Async Function` object.
 *
 * @param {*} fn - The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */
export default function isAsyncFunction(fn) {
  if (supportsAsync === false || typeof fn !== 'function') {
    return false;
  }

  let str;
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
}
