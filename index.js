/* eslint-disable func-names, no-extra-bind */

'use strict';
module.exports = (fn, name) => {
	Object.defineProperty(fn, 'name', {value: name, configurable: true});
	const functionString = fn.toString();
	if (
		!(
			!/^(?:async\s*)?(?:(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:function)?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\*?.*?\s*(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n)\s*)*\(/.test(functionString) ||
			functionString
				.replace(/(async|function|\s*)/g, '')
				.replace(/(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))/g)
				.trim()
				.startsWith('(')
		) &&
		functionString.indexOf('class') !== 0 &&
		(!/^(get|set)/.test(functionString) || !functionString.slice(fn.name.length).replace(/\s/g, '').replace(/(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*/g, '').trim().startsWith('('))
	) {
		fn.toString = (function toString() {
			const captured = /^((?:get|set)?(?:async\s*)?(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:function)?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\*?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*)([^]*?)\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\(/.exec(functionString);
			return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
		}).bind(fn);
	} else if (functionString.indexOf('class') === 0 && !functionString.replace('class', '').replace(/\s*/g, '').replace(/\/\*[^]*?\*\/|\/\/[^]*?(\r\n|\r|\n)\s*/g, '').startsWith('{')) {
		fn.toString = (function toString() {
			const captured = /^(class\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*)([^]*?)\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:extends|{)/.exec(functionString);
			return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
		}).bind(fn);
	} else if (/^(get|set)/.test(functionString)) {
		fn.toString = (function toString() {
			return name + functionString.slice(fn.name.length);
		}).bind(fn);
	}

	return fn;
};
