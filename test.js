const test = require('ava');
const m = require('./index.js');

test('name', t => {
	function foo() {}
	t.is(foo.name, 'foo');
	m(foo, 'unicorn');
	t.is(foo.name, 'unicorn');
});

test('toString', t => {
	/* eslint-disable brace-style, capitalized-comments, func-name-matching, func-names, generator-star-spacing, no-multi-spaces, no-new-func, no-unused-vars, no-useless-computed-key, node/no-unsupported-features/es-syntax, object-curly-spacing, object-shorthand, quotes, semi, space-before-blocks, space-before-function-paren, spaced-comment, space-in-parens */
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
		},
		{
			function: function* generator() {},
			name: 'gen',
			string: 'function* gen() {}'
		},
		{
			function: function * generator() {},
			name: 'gen',
			string: 'function * gen() {}'
		},
		{
			function: function /* comments */* generator() {},
			name: 'gen',
			string: 'function /* comments */* gen() {}'
		},
		{
			function: async function /* comments */ * generator() {},
			name: 'gen',
			string: 'async function /* comments */ * gen() {}'
		},
		{
			function: async /*function () {}*/ function /* function* () {console.log("fakegen")} */ * /*sdf*/sky/*hello*/() {},
			name: 'gen',
			string: 'async /*function () {}*/ function /* function* () {console.log("fakegen")} */ * /*sdf*/gen/*hello*/() {}'
		},
		{
			/* eslint-disable indent */
			function: async /*function () {}*/ function /* function* () {console.log("fakegen")} */
// hello
* /*sdf*/sky/*hello*/() {},
			/* eslint-enable indent */
			name: 'gen',
			string: 'async /*function () {}*/ function /* function* () {console.log("fakegen")} */\n// hello\n* /*sdf*/gen/*hello*/() {}'
		},
		{
			function: class classy {},
			name: 'B',
			string: 'class B {}'
		},
		{
			/* eslint-disable indent */
			function: class sample extends (class another {}) { /* constructor */ constructor(stuff) { // constructed method
// look down
super();
this.stuff = stuff;
} },
			/* eslint-enable indent */
			name: 'extendedSample',
			string: 'class extendedSample extends (class another {}) { /* constructor */ constructor(stuff) { // constructed method\n// look down\nsuper();\nthis.stuff = stuff;\n} }'
		},
		{
			function: ({ [0](){} }[0]),
			name: '[1]',
			string: '[1](){}'
		},
		{
			function: ({ a(){} }.a),
			name: 'b',
			string: 'b(){}'
		},
		{
			function: ({ get(){} }.get),
			name: 'set',
			string: 'set(){}'
		},
		{
			function: ({ getter(){} }.getter),
			name: 'setter',
			string: 'setter(){}'
		},
		{
			function: async functionA => {},
			name: 'functionB',
			string: 'async functionA => {}'
		},
		{
			function: ({ *a(){} }.a),
			name: 'b',
			string: '*b(){}'
		},
		{
			function: ({ * /* I am totally defining a generator method */ a(){} }.a),
			name: 'b',
			string: '* /* I am totally defining a generator method */ b(){}'
		},
		{
			function: (Object.getOwnPropertyDescriptor({ get /* I am totally defining a getter */ a ( ){ return 'nothing'  } }, "a").get),
			name: 'b',
			string: 'get /* I am totally defining a getter */ b ( ){ return \'nothing\'  }'
		},
		{
			function: (Object.getOwnPropertyDescriptor({ get a(){return 'a'}, set /* I am totally defining a setter */ a ( x){} }, "a").set),
			name: 'b',
			string: 'set /* I am totally defining a setter */ b ( x){}'
		},
		{
			function: (function(){}).bind(),
			name: 'binded',
			string: 'function () { [native code] }'
		},
		{
			function: new Function("a", "return a"),
			name: 'anonymousFunc',
			string: 'function anonymousFunc(a\n) {\nreturn a\n}'
		},
		{
			function: String,
			name: 'myString',
			string: 'function myString() { [native code] }'
		}
	];
	/* eslint-enable */
	fnStringCases.forEach(element => {
		element.function = m(element.function, element.name);
		t.is(element.function.toString(), element.string);
	});
});
