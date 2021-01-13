/* eslint-disable func-names, no-extra-bind */

'use strict';
module.exports = (fn, name) => {
	// Set the name property first
	Object.defineProperty(fn, 'name', {value: name, configurable: true});

	// Cache the string to prevent a recursive function
	const functionString = fn.toString();

	// Make sure that the function is not:
	//	1. An arrow function (can't have a name)
	//	2. A function without a name, e.g. function() {}
	if (
		/^(?:async\s*)?(?:(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:function)?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\*?.*?\s*(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n)\s*)*\(/.test(functionString) &&
		!functionString
			.replace(/(async|function|\s*)/g, '')
			.replace(/(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))/g)
			.trim()
			.startsWith('(')
	) {
		fn.toString = (function toString() {
			// The function can fall in 3 categories:
			// 	1. Not a class, or a method starting with get/set (all other functions and methods)
			// 	2. Classes
			// 	3. Methods with their name as get*/set*
			if (
				functionString.indexOf('class') !== 0 &&
				(!/^(get|set)/.test(functionString) || !functionString.slice(fn.name.length).replace(/\s/g, '').replace(/(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*/g, '').trim().startsWith('('))
			) {
				const captured = /^((?:get|set)?(?:async\s*)?(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:function)?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\*?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*)([^]*?)\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\(/.exec(functionString);
				return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
			} else if (functionString.indexOf('class') === 0 && !functionString.replace('class', '').replace(/\s*/g, '').replace(/\/\*[^]*?\*\/|\/\/[^]*?(\r\n|\r|\n)\s*/g, '').startsWith('{')) {
				const captured = /^(class\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*)([^]*?)\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:extends|{)/.exec(functionString);
				return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
			} else if (/^(get|set)/.test(functionString)) {
				return name + functionString.slice(fn.name.length);
			}		
		}).bind(fn)
	}

	return fn;
};
