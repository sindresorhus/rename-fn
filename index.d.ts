/**
Rename a function.

@param function_ - The function to rename.
@param name - The new name.

@example
```
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
*/
// eslint-disable-next-line @typescript-eslint/ban-types
export default function renameFunction<F extends Function>(
	function_: F,
	name: string
): F;
