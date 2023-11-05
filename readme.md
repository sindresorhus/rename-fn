# rename-fn

> Rename a function

JavaScript engines are good at [inferring function names](http://www.2ality.com/2015/09/function-names-es6.html). You probably don't need this unless you want a different name.

## Install

```sh
npm install rename-fn
```

## Usage

```js
import renameFunction from 'rename-fn';

function foo() {}

console.log(foo.name);
//=> 'foo'

foo.name = 'unicorn';
console.log(foo.name);
//=> 'foo' 😢

renameFunction(foo, 'unicorn');
console.log(foo.name);
//=> 'unicorn' 😁
```

## API

### renameFunction(function, name)

#### function

Type: `function`

The function to rename.

#### name

Type: `string`

The new name.

## Related

- [mimic-function](https://github.com/sindresorhus/mimic-function) - Make a function mimic another one
