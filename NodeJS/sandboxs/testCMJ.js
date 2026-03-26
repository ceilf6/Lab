const jsonObj = require("./testJSON")
console.log(jsonObj)

require("./")

console.log(module)
/**
 * id
 * path
 * exports 对象
 * loaded
 * children
 * Symbol
 */

console.log(require)
console.log(require.resolve('./'))
// package main声明的 /Users/a86198/Desktop/Lab/NodeJS/sandboxs/mainDec.js