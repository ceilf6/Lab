// 引用数据类型作为 key => 用其引用地址

const key = [1, 2]

const map = new Map()

map.set(key, 'ceilf6')
console.log(map.get([1, 2])) // undefined
console.log(map.get(key)) // ceilf6

// === 想按值获取

// 1. JSON
map.set(JSON.stringify([1, 2]), 'ceilf7')
console.log(map.get(JSON.stringify([1, 2]))) // ceilf7

// 2. 自己拼接字符串 => hash
const arr = [1, 2]
const hashKey =
    arr.reduce((s, item) => {
        s += new String(item) + ','
        return s
    }, '')
console.log(hashKey) // 1,2,
map.set(hashKey, 'ceilf8')
console.log(map.get(hashKey)) // ceilf8