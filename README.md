<a
  href="https://travis-ci.org/Xotic750/is-async-function-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/is-async-function-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/is-async-function-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-async-function-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/is-async-function-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-async-function-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/is-async-function-x"
  title="npm version">
<img src="https://badge.fury.io/js/is-async-function-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/is-async-function-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/is-async-function-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/is-async-function-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/is-async-function-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/is-async-function-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/is-async-function-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_is-async-function-x"></a>

## is-async-function-x

Determine if a function is a native aync function.

**See**: [14.6 Async Function Definitions](https://tc39.github.io/ecma262/#sec-async-function-definitions)  

<a name="exp_module_is-async-function-x--module.exports"></a>

### `module.exports(fn)` ⇒ <code>boolean</code> ⏏

Checks if `value` is classified as an `Async Function` object.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
else `false`.

| Param | Type            | Description         |
| ----- | --------------- | ------------------- |
| fn    | <code>\*</code> | The value to check. |

**Example**

```js
import isAsyncFunction from 'is--async-function-x';

isAsyncFunction(); // false
isAsyncFunction(Number.MIN_VALUE); // false
isAsyncFunction('abc'); // false
isAsyncFunction(true); // false
isAsyncFunction({ name: 'abc' }); // false
isAsyncFunction(function () {}); // false
isAsyncFunction(new Function ()); // false
isAsyncFunction(function* test1() {}); // false
isAsyncFunction(function test2(a, b) {}); // false
isAsyncFunction(class Test {}); // false
isAsyncFunction((x, y) => {return this;}); // false
isAsyncFunction(async functin() {}); // true
```
