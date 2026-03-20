const ten1 = 10
const ten2 = 10n

console.log(ten1 == ten2) // true
console.log(ten1 === ten2) // false

// console.log(ten2 * 1) // TypeError: Cannot mix BigInt and other types, use explicit conversions
console.log(ten2) // 10n
console.log(Number(ten2)) // 10
console.log(ten2 * 1n)
console.log(ten2 * BigInt(1))

// Math API 不支持 BigInt
// console.log(Math.max(ten2, 100n)) // TypeError: Cannot convert a BigInt value to a number