'use strict';
module.exports = (fn, name) => {
	Object.defineProperty(fn, 'name', {value: name, configurable: true});
	const notArrowFuncReg = /^(?:async\s*)?(?:(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*function/;
	if (
		!(
			!notArrowFuncReg.test(fn.toString()) ||
			fn.toString()
				.replace(notArrowFuncReg, '')
				.replace(/(\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))/g)
				.trim()
				.startsWith('(')
		)
	) {
		const captured = /^((?:async\s*)?(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*function\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*)([^]*?)\s*(?:(?:\/\*[^]*?\*\/|\/\/[^]*?(?:\r\n|\r|\n))\s*)*\(/.exec(fn.toString());
		const functionString = fn.toString();
		fn.toString = (() => {
			return functionString.slice(0, Math.max(0, captured[1].length)) +
				name +
				functionString.slice(Math.max(0, captured[1].length + captured[2].length));
			/* eslint-disable-next-line no-extra-bind */
		}).bind(fn);
	}

	return fn;
};
