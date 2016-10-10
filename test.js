import test from 'ava';
import m from './';

test(t => {
	function foo() {}
	t.is(foo.name, 'foo');
	m(foo, 'unicorn');
	t.is(foo.name, 'unicorn');
});
