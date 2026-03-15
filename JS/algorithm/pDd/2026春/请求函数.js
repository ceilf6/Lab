// 3. 要求实现一个有缓存、不会重复发送请求、超时报错的请求函数
function createCachedRequest(requestFn, options = {}) {
    const memo = new Map() // 闭包实现缓存
    const curTasks = new Map() // 保存异步任务Promise，防止多次请求

    const ttl = options.ttl ?? 5000
    const timeout = options.timeout

    return async function (key) {
        if (memo.has(key)) {
            const memoObj = memo.get(key)
            const lastTime = memoObj.time // 注意是普通对象
            if (Date.now() - lastTime < ttl) {
                return memoObj.val // 命中缓存
            }
        }
        if (curTasks.has(key)) { // 前面已经有一次请求
            const res = await curTasks.get(key)
            if (res === 'Timeout') return 'Timeout' // 如果超时就不走下面缓存
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
        if (!timeout) {
            // 如果存储的是 async () => {} 那就是一个返回Promise的函数，正确的应该是存储promise
            const promise = requestFn(key)
            curTasks.set(key, promise)
            const res = await curTasks.get(key) // 没设置timeout不可能超时
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
        else {
            // 直接存储 new Promise 
            curTasks.set(key, new Promise(
                (resolve, reject) => {
                    // 利用 Promise 状态只可能改变一次，同时使用 reject 和 resolve
                    setTimeout(() => {
                        reject('Timeout')
                    }, timeout)
                    const res = requestFn(key)
                    resolve(res)
                }
            ).finally(() => { // 结束后清理任务（无论成功与否）
                curTasks.delete(key)
            }))
            const res = await curTasks.get(key)
            if (res === 'Timeout')
                throw new Error('Timeout') // 超时本质上是失败，应该报错
            // return 'Timeout'
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
    }
}
// 思路：通过 memo 管理缓存，通过 async, await语法糖 以及 Promise 管理异步