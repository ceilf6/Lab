// 3. 要求实现一个有缓存、不会重复发送请求、超时报错的请求函数
function createCachedRequest(requestFn, options = {}) {
    // 闭包实现缓存
    // 请求 => 缓存 => 响应 => 缓存
    const memo = new Map()

    const curTasks = new Map() // 保存异步任务Promise，防止多次请求

    const ttl = options.ttl ?? 5000
    const timeout = options.timeout

    return async function (key) {
        // 请求 => 缓存
        const cached = memo.get(key)

        if (cached && Date.now() - cached.time < ttl) {
            return cached.val
        }

        if (curTasks.has(key)) {
            return curTasks.get(key)
        }

        let task;

        if (timeout != null) { // 有超时，那么得 race
            task = Promise.race([
                Promise.resolve(requestFn(key)),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), timeout)
                )
            ]);
        } else {
            task = Promise.resolve(requestFn(key))
        }

        // 无论如何都需要存储 Promise 而不是函数
        curTasks.set(key, task)

        // 响应 => 缓存
        try {
            const res = await task
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        } catch (e) {
            if (e.message === 'Timeout') {
                // 此处可以对超时做一些特殊处理
                throw new Error('请求超时')
            }
            throw e
        } finally {
            curTasks.delete(key)
        }
    }
}
// 思路：通过 memo 管理缓存，通过 async, await语法糖 以及 Promise 管理异步