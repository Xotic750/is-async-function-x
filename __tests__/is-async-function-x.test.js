let isAsyncFunction;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  isAsyncFunction = require('../../index.js');
} else {
  isAsyncFunction = returnExports;
}

let asyncFunc;
try {
  // eslint-disable-next-line no-new-func
  asyncFunc = new Function('return async function() {}')();
} catch (ignore) {}

const ifSupportsAFit = asyncFunc ? it : xit;

describe('basic tests', function() {
  it('should return `false` for everything', function() {
    const values = [
      true,
      'abc',
      1,
      null,
      undefined,
      new Date(),
      [],
      /r/,
      Object,
      String,
      Boolean,
      Array,
      function() {},
      // eslint-disable-next-line no-unused-vars
      function test(a) {},
      // eslint-disable-next-line no-new-func
      new Function(),
      // eslint-disable-next-line no-unused-vars
      function test1(a, b) {},
      // eslint-disable-next-line no-unused-vars
      function test2(a /* , foo */) {},
      // eslint-disable-next-line no-unused-vars
      function test3(a /* , foo */, b) {},
      // eslint-disable-next-line no-unused-vars
      function test4(a /* , foo */, b) {},
      // eslint-disable-next-line no-unused-vars
      function /* foo */ test5(a /* , foo */, b) {},
      // eslint-disable-next-line no-unused-vars
      function /* foo */ test6 /* bar */(a /* , foo */, b) {},
      function /* foo */ test7 /* bar */(/* baz */) {},
      /* fum */ function /* foo */ // blah
      test8(
        /* baz */ a, // eslint-disable-line no-unused-vars
      ) {},
    ];
    const expected = values.map(function() {
      return false;
    });
    const actual = values.map(isAsyncFunction);
    expect(actual).toStrictEqual(expected);

    let fat;
    try {
      // eslint-disable-next-line no-new-func
      fat = new Function('return (x, y) => {return this;};')();
      expect(isAsyncFunction(fat)).toBe(false);
    } catch (ignore) {}

    let gen;
    try {
      // eslint-disable-next-line no-new-func
      gen = new Function('return function* idMaker(x, y){};')();
      expect(isAsyncFunction(gen)).toBe(false);
    } catch (ignore) {}

    let classes;
    try {
      // eslint-disable-next-line no-new-func
      classes = new Function('"use strict"; return class My {};')();
      expect(isAsyncFunction(classes)).toBe(false);
    } catch (ignore) {}
  });

  ifSupportsAFit('should return `true`', function() {
    expect(isAsyncFunction(asyncFunc)).toBe(true);
    // eslint-disable-next-line no-new-func
    asyncFunc = new Function('return /*fgdfg*/ async /*eerwe*/ function(/*as*/) {}')();
    expect(isAsyncFunction(asyncFunc)).toBe(true);
  });
});
