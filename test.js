import test from 'ava';
import renameFunction from './index.js';

test('main', t => {
	function foo() {}
	t.is(foo.name, 'foo');
	renameFunction(foo, 'unicorn');
	t.is(foo.name, 'unicorn');
});
