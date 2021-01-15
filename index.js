/* eslint-disable func-names, no-extra-bind, no-else-return */

'use strict';

function nameOfMethod(methodString) {
	return methodString.slice(/(.*?)[\s/(]/.exec(methodString)[1].length);
}

module.exports = (fn, name) => {
	// Set the name property first
	Object.defineProperty(fn, 'name', {value: name, configurable: true});

	// Cache the string to prevent a recursive function
	const functionString = fn.toString();

	const edgeCaseMethodNameReg = /^(get|set|async|function)/;

	// Make sure that the function is not:
	//	1. An arrow function (can't have a name)
	//	2. A function without a name, e.g. function() {}
	// If the above fail, then a class with a name is fine
	if (
		(
			/^(async\s*)?(\/(\*[^]*?\*\/|\/.*?\n)\s*)*(function)?\s*(\/(\*[^]*?\*\/|\/.*?\n)\s*)*\*?.*?\s*(\/\*[^]*?\*\/|\/\/.*?\n\s*)*\(/.test(functionString) &&
			(
				!functionString.replace(/async|function|\/\*[^]*?\*\/|\/\/.*?\n|\s/g, '').startsWith('(') ||
				/^\(.*?\)(?!=>)/.test(functionString.replace(/async|\/\*[^]*?\*\/|\/\/.*?\n|\s/g, ''))
			)
		) || (functionString.startsWith('class') && !functionString.replace(/class|\/\*[^]*?\*\/|\/\/.*?\n|\s/g, '').startsWith('{'))
	) {
		fn.toString = (function toString() {
			// The function can fall in 3 categories:
			//	1. Classes
			//	2. Not a class, or a method starting with get/set (all other functions and methods)
			//	3. Methods with their name as get*/set*/async*/function*
			if (functionString.startsWith('class')) {
				const captured = /^(class\s*(\/(\*[^]*?\*\/|\/.*?\n)\s*)*)(.*?)\s*(\/(\*[^]*?\*\/|\/.*?\n)\s*)*(extends|{)/.exec(functionString);
				return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[4].length);
			} else if (!edgeCaseMethodNameReg.test(functionString) || !nameOfMethod(functionString).replace(/\/\*[^]*?\*\/|\/\/.*?\n|\s/g, '').trim().startsWith('(')) {
				const captured = /^((get|set|async)?\s*(\/(\*[^]*?\*\/|\/.*?\n)\s*)*(function)?\s*(\/(\*[^]*?\*\/|\/.*?\n)\s*)*\*?\s*(\/(\*[^]*?\*\/|\/.*?\n)\s*)*)(.*?)\s*(\/(\*[^]*?\*\/|\/.*?\n)\s*)*\(/.exec(functionString);
				return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[10].length);
			}

			return name + nameOfMethod(functionString);
		}).bind(fn);
	}

	return fn;
};
