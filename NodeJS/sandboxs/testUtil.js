// https://nodejs.org/docs/latest/api/util.html

const util = require("util")

const asyncFunc = (arg) => new Promise(resolve => {
    // fn && fn()
    console.log(arg)
    setTimeout(() => resolve('success'), 1000)
})
const curTime = () => console.log(Date.now())
asyncFunc('promise arg').then(res => { console.log('promise', res) })

// 异步 => 以前的回调写法
const asyncFuncCallback = util.callbackify(asyncFunc)
asyncFuncCallback('callback arg', (err, res) => console.log('callback', res))

// 回调模式 => 异步模式
const asyncFunc2 = util.promisify(asyncFuncCallback)
asyncFunc2('promise2 arg').then(res => { console.log('promise2', res) })


const obj1 = [
    'a1',
    {
        a2: 'a2'
    },
    {
        a3: {
            a3: 'a3'
        }
    }
]
const obj2 = [
    'a1',
    {
        a2: 'a2'
    },
    {
        a3: {
            a3: 'a33'
        }
    }
]
console.log(util.isDeepStrictEqual(obj1, obj2))