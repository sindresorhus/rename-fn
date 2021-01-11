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
		const captured = /^((?:get|set)?(?:async\s*)?(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:function)?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\*?\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*)([^]*?)\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\(/.exec(functionString);
		fn.toString = (() => {
			return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
			/* eslint-disable-next-line no-extra-bind */
		}).bind(fn);
	} else if (functionString.indexOf('class') === 0) {
		const captured = /^(class\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*)([^]*?)\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*(?:extends|{)/.exec(functionString);
		if (captured[2] !== '') {
			fn.toString = (() => {
				return functionString.slice(0, captured[1].length) + name + functionString.slice(captured[1].length + captured[2].length);
				/* eslint-disable-next-line no-extra-bind */
			}).bind(fn);
		}
	} else if (/^(get|set)/.test(functionString)) {
		fn.toString = (() => {
			return name + functionString.slice(fn.name.length);
			/* eslint-disable-next-line no-extra-bind */
		}).bind(fn);
	}

	return fn;
};
