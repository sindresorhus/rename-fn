/* eslint-disable func-names, no-extra-bind */

'use strict';

function nameOfMethod(methodString) {
	return methodString.slice(/([^]*?)[\s/(]/.exec(methodString)[1].length);
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
	if (
		(
			/^(async\s*)?(\/(\*[^]*?\*\/|\/[^]*?\n)\s*)*(function)?\s*(\/(?:\*[^]*?\*\/|\/[^]*?\n)\s*)*\*?.*?\s*(\/\*[^]*?\*\/|\/\/[^]*?\n\s*)*\(/.test(functionString) &&
			(
				!functionString
					.replace(/async|function|\s*/g, '')
					.replace(/\/\*[^]*?\*\/|\/\/[^]*?\n/g, '')
					.trim()
					.startsWith('(') ||
				/^\(.*?\)(?!=>)/.test(
					functionString
						.replace(/async|\s*/g, '')
						.replace(/\/\*[^]*?\*\/|\/\/[^]*?\n/g, '')
						.trim()
				)
			)
		) || (functionString.indexOf('class') === 0 && !functionString.replace('class', '').replace(/\s*/g, '').replace(/\/\*[^]*?\*\/|\/\/[^]*?\n/g, '').startsWith('{'))
	) {
		fn.toString = (function toString() {
			// The function can fall in 3 categories:
			//	1. Not a class, or a method starting with get/set (all other functions and methods)
			//	2. Classes
			//	3. Methods with their name as get*/set*
			if (
				functionString.indexOf('class') !== 0 &&
				(!edgeCaseMethodNameReg.test(functionString) || !nameOfMethod(functionString).replace(/\s/g, '').replace(/\/\*[^]*?\*\/|\/\/[^]*?\n/g, '').trim().startsWith('('))
			) {
				const captured = /^((?:get|set)?(?:async\s*)?(?:\/(?:\*[^]*?\*\/|\/[^]*?\n)\s*)*(?:function)?\s*(?:\/(?:\*[^]*?\*\/|\/[^]*?\n)\s*)*\*?\s*(?:\/(?:\*[^]*?\*\/|\/[^]*?\n)\s*)*)([^]*?)\s*(?:\/(?:\*[^]*?\*\/|\/[^]*?\n)\s*)*\(/.exec(functionString);
				return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
			}

			if (functionString.indexOf('class') === 0) {
				const captured = /^(class\s*(?:\/(?:\*[^]*?\*\/|\/[^]*?\n)\s*)*)([^]*?)\s*(?:\/(?:\*[^]*?\*\/|\/[^]*?\n)\s*)*(?:extends|{)/.exec(functionString);
				return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
			}

			if (edgeCaseMethodNameReg.test(functionString)) {
				return name + nameOfMethod(functionString);
			}
		}).bind(fn);
	}

	return fn;
};
