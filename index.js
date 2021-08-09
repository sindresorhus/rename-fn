export default function renameFunction(function_, name) {
	return Object.defineProperty(function_, 'name', {value: name, configurable: true});
}
