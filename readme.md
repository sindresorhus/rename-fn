# rename-fn [![Build Status](https://travis-ci.org/sindresorhus/rename-fn.svg?branch=master)](https://travis-ci.org/sindresorhus/rename-fn)

> Rename a function

JavaScript engines are very good at [inferring function names](http://www.2ality.com/2015/09/function-names-es6.html). You probably don't need this unless you want a different name.


## Install

```
$ npm install --save rename-fn
```


## Usage

```js
const renameFn = require('rename-fn');

function foo() {}

console.log(foo.name);
//=> 'foo'

foo.name = 'unicorn';
console.log(foo.name);
//=> 'foo' 😢

renameFn(foo, 'unicorn');
console.log(foo.name);
//=> 'unicorn' 😁
```


## API

### renameFn(fn, name)

#### fn

Type: `Function`

Function to rename.

#### name

Type: `string`

New name.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
