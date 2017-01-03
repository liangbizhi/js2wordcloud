var class2type = {}
var types = ['Null', 'Undefined', 'Number', 'Boolean', 'String', 'Object', 'Function', 'Array', 'RegExp', 'Date']
for (var i = 0; i < types.length; i++) {
	class2type['[object ' + types[i] + ']'] = types[i].toLowerCase()
}

function getType(obj) {
	return class2type[Object.prototype.toString.call(obj)] || 'Object'
}

function isType(obj, type) {
	return getType(obj) === type
}

export default {
	copy(obj, deep) {
		if (obj === null || typeof obj != 'object') {
			return obj
		}
		var i,
			target = isType(obj, 'array') ? [] : {},
			value,
			valueType
		for (i in obj) {
			value = obj[i]
			valueType = getType(value)
			if (deep && (valueType === 'array' || valueType === 'object')) {
				target[i] = this.copy(value)
			} else {
				target[i] = value
			}
		}
		return target
	}
}