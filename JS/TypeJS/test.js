import validatorFunc from './index.js'

const sum = (a, b) => a + b

const sumProxy = validatorFunc(sum, "number", "number")

console.log(sumProxy(1, 2))
console.log(sumProxy('ceilf6', 20))