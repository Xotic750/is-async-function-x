/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1, no-new-func: 1 */

/* global JSON:true, expect, module, require, describe, it, xit, returnExports */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var isAsyncFunction;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
    var es7 = require('es7-shim');
    Object.keys(es7).forEach(function (key) {
      var obj = es7[key];
      if (typeof obj.shim === 'function') {
        obj.shim();
      }
    });
    isAsyncFunction = require('../../index.js');
  } else {
    isAsyncFunction = returnExports;
  }

  var getAF = function getAsyncFunc() {
    try {
      return new Function('return async function() {}')();
    } catch (ignore) {}
    return false;
  };

  var ifSupportsAFit = getAF() ? it : xit;

  describe('Basic tests', function () {
    it('should return `false` for everything', function () {
      var values = [
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
        Function,
          /* jscs:disable */
        function () {},
          /* jshint unused:false */
        function test(a) {}, // eslint-disable-line no-unused-vars
          /* jshint evil:true */
        new Function(), // eslint-disable-line no-new-func
          /* jshint evil:false */
        function test1(a, b) {}, // eslint-disable-line no-unused-vars
        function test2(a/* , foo*/) {}, // eslint-disable-line no-unused-vars
        function test3(a/* , foo*/, b) { }, // eslint-disable-line no-unused-vars
        function test4(a/* , foo*/, b) { }, // eslint-disable-line no-unused-vars
        function/* foo*/test5(a/* , foo*/, b) {}, // eslint-disable-line no-unused-vars
        function/* foo*/test6/* bar*/(a/* , foo*/, b) {}, // eslint-disable-line no-unused-vars
        function/* foo*/test7/* bar*/(/* baz*/) {},
        /* fum*/function/* foo*/ // blah
            test8(/* baz*/a // eslint-disable-line no-unused-vars
             ) {}
            /* jscs:enable */
      ];
      var expected = values.map(function () {
        return false;
      });
      var actual = values.map(isAsyncFunction);
      expect(actual).toEqual(expected);

      var fat;
      try {
        /* jshint evil:true */
        fat = new Function('return (x, y) => {return this;};')(); // eslint-disable-line no-new-func
        expect(isAsyncFunction(fat)).toBe(false);
      } catch (ignore) {}

      var gen;
      try {
        /* jshint evil:true */
        gen = new Function('return function* idMaker(x, y){};')(); // eslint-disable-line no-new-func
        expect(isAsyncFunction(gen)).toBe(false);
      } catch (ignore) {}

      var classes;
      try {
        /* jshint evil:true */
        classes = new Function('"use strict"; return class My {};')(); // eslint-disable-line no-new-func
        expect(isAsyncFunction(classes)).toBe(false);
      } catch (ignore) {}
    });

    ifSupportsAFit('should return `true`', function () {
      var af = getAF();
      expect(isAsyncFunction(af)).toBe(true);
      af = new Function('return /*fgdfg*/ async /*eerwe*/ function(/*as*/) {}')();
      expect(isAsyncFunction(af)).toBe(true);
    });
  });
}());
