const a = {1:1}
console.log(Object.prototype.toString.call(this,a)) // this 不应该显式 （py的self需要显式）
console.log(Object.prototype.toString.call(a))

const b = []
console.log(Object.prototype.toString.call(b))

function isType(value, type) {
	return Object.prototype.toString.call(value) === `[object ${type}]`
}

// 工厂函数：将差异作为变量传入
export const isBoolean   = value => isType(value, 'Boolean')
export const isNumber    = value => isType(value, 'Number')
export const isNull      = value => isType(value, 'Null')
export const isString    = value => isType(value, 'String')
export const isSymbol    = value => isType(value, 'Symbol')
export const isUndefined = value => isType(value, 'Undefined')