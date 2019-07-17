import isAsyncFunction from '../src/is-async-function-x';

let asyncFunc;
try {
  asyncFunc = new Function('return async function() {}')();
} catch (ignore) {
  // empty
}

const ifSupportsAFit = asyncFunc ? it : xit;

describe('basic tests', function() {
  it('should return `false` for everything', function() {
    expect.assertions(4);
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
      /* eslint-disable-next-line no-unused-vars */
      function test(a) {},
      new Function(),
      /* eslint-disable-next-line no-unused-vars */
      function test1(a, b) {},
      /* eslint-disable-next-line no-unused-vars */
      function test2(a /* , foo */) {},
      /* eslint-disable-next-line no-unused-vars */
      function test3(a /* , foo */, b) {},
      /* eslint-disable-next-line no-unused-vars */
      function test4(a /* , foo */, b) {},
      /* eslint-disable-next-line no-unused-vars */
      function /* foo */ test5(a /* , foo */, b) {},
      /* eslint-disable-next-line no-unused-vars */
      function /* foo */ test6 /* bar */(a /* , foo */, b) {},
      function /* foo */ test7 /* bar */(/* baz */) {},
      /* fum */ function /* foo */ // blah
      test8(/* baz */ a /* eslint-disable-line no-unused-vars */) {},
    ];
    const expected = values.map(function() {
      return false;
    });
    const actual = values.map(isAsyncFunction);
    expect(actual).toStrictEqual(expected);

    let fat;
    try {
      fat = new Function('return (x, y) => {return this;};')();
      expect(isAsyncFunction(fat)).toBe(false);
    } catch (ignore) {
      // empty
    }

    let gen;
    try {
      gen = new Function('return function* idMaker(x, y){};')();
      expect(isAsyncFunction(gen)).toBe(false);
    } catch (ignore) {
      // empty
    }

    let classes;
    try {
      classes = new Function('"use strict"; return class My {};')();
      expect(isAsyncFunction(classes)).toBe(false);
    } catch (ignore) {
      // empty
    }
  });

  ifSupportsAFit('should return `true`', function() {
    expect.assertions(2);
    expect(isAsyncFunction(asyncFunc)).toBe(true);

    asyncFunc = new Function('return /*fgdfg*/ async /*eerwe*/ function(/*as*/) {}')();
    expect(isAsyncFunction(asyncFunc)).toBe(true);
  });
});
