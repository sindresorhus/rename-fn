const test = require('ava');
const m = require('./index.js');

test('name', t => {
	function foo() {}
	t.is(foo.name, 'foo');
	m(foo, 'unicorn');
	t.is(foo.name, 'unicorn');
});

test('toString', t => {
	/* eslint-disable brace-style, capitalized-comments, func-name-matching, func-names, no-unused-vars, node/no-unsupported-features/es-syntax, object-shorthand, quotes, semi, space-before-blocks, space-before-function-paren, spaced-comment */
	const fnStringCases = [
		{
			function: function blah (...args) {console.log("arguments:", args)},
			name: 'hello',
			string: 'function hello (...args) {console.log("arguments:", args)}'
		},
		{
			function: async () => "fdas",
			name: 'unicorn',
			string: 'async () => "fdas"'
		},
		{
			function: (hello, hi) => {},
			name: 'dude',
			string: '(hello, hi) => {}'
		},
		{
			function: async async => {},
			name: 'another',
			string: 'async async => {}'
		},
		{
			function: function () {},
			name: 'name',
			string: 'function () {}'
		},
		{
			function: async /* function () {} */ function dude() {},
			name: 'blue',
			string: 'async /* function () {} */ function blue() {}'
		},
		{
			function: function /*cmon*/ /*sdf*/ man() {},
			name: 'man2',
			string: 'function /*cmon*/ /*sdf*/ man2() {}'
		},
		{
			function: function /* cmon */ /* sdf */ man() {},
			name: 'man2',
			string: 'function /* cmon */ /* sdf */ man2() {}'
		},
		{
			function: function /*cmon*//*sdf*/ man() {},
			name: 'man2',
			string: 'function /*cmon*//*sdf*/ man2() {}'
		},
		{
			function: async /*function () {}*/ function /*sdf*/sky/*hello*/() {},
			name: 'green',
			string: 'async /*function () {}*/ function /*sdf*/green/*hello*/() {}'
		},
		{
			/* eslint-disable indent */
			function: function // stuff
another(){},
			/* eslint-enable indent */
			name: 'line',
			string: 'function // stuff\nline(){}'
		}
	];
	/* eslint-enable */
	fnStringCases.forEach(element => {
		element.function = m(element.function, element.name);
		t.is(element.function.toString(), element.string);
	});
});
