function createCachedRequest(requestFn, options = {}) {
    const memo = new Map()
    const ttl = options.ttl ? options.ttl : 5000
    const timeout = options.timeout
    const curTasks = new Map() // 保存异步任务Promise，防止多次请求    

    return async (key) => {
        if (memo.has(key)) {
            const memoObj = memo.get(key)
            const lastTime = memoObj.get(time)
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
            curTasks.set(key, async () => {
                return await requestFn(key)
            })
            const res = await curTasks.get(key) // 没设置timeout不可能超时
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
        else {
            curTasks.set(key, () => new Promise(
                (resolve, reject) => {
                    // 利用 Promise 状态只可能改变一次，同时使用 reject 和 resolve
                    setTimeout(() => {
                        reject('Timeout')
                    }, timeout)
                    const res = requestFn(key)
                    resolve(res)
                }
            ))
            const res = await curTasks.get(key)
            if (res === 'Timeout') return 'Timeout'
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
    }
}
// 思路：通过 memo 管理缓存，通过 async, await语法糖 以及 Promise 管理异步



function createEventBus() {
    this.listeners = new Map()
}

// 只有_内部函数才能操作 listeners
// 在内部用于添加回调函数的工具函数
// 通过单调递增的 id 确保不会因为删除而有重复 id
createEventBus.prototype._add = (event, handler, once) => {
    if (!this.listeners.has(event)) { // 初始化
        this.listeners.set(event, [0])
    }
    const pre = this.listeners.get(event)
    const newId = pre[0] + 1
    const curObj = {
        id: newId,
        handler: () => handler(),
        flag: once // 是否只执行一次就移除
    }
    const new = [...pre, curObj]
    new [0] = newId
    this.listeners.set(event, new)
    return newId // 返回 newId 用于删除
}

// 在内部用于删除回调函数的工具函数
createEventBus.prototype._delete = (event, id) => {
    const cur = this.listeners.get(event)
    if (cur[0] < id) return false // 如果最大的 id 都比当前输入的小，那么肯定输错了
    let targetIdx = -1
    for (let i = 0; i < cur.length; i++) {
        if (cur[i].id === id) {
            targetIdx = i
            break
        }
    }
    if (targetIdx === -1) return false
    const new = cur.splice(targetIdx, 1)
    this.listeners.set(event, new)
    return true // 删除成功
}

createEventBus.prototype.on = function (event, handler) {
    if (!handler) return false // 特殊情况处理，防止执行空导致报错
    const newId = this._add(event, handler, false)
    return () => this._delete(event, newId)
}

createEventBus.prototype.once = function (event, handler) {
    if (!handler) return false
    const newId = this._add(event, handler, true)
    return () => this._delete(event, newId)
}

createEventBus.prototype.emit = function (event, ...args) {
    const arr = this.listeners.get(event)
    for (const item of arr) {
        item.handler(args)
        if (item.once) {
            this._delete(event, item.id)
        }
    }
}
// 思路：内部通过listeners映射维护监听者数组，并且
// 只有_内部函数才能操作 listeners
// 在内部用于添加回调函数的工具函数
// 通过单调递增的 id 确保不会因为删除而有重复 id



function diffList(oldList, newList, key) {
    const ans = {
        added: [],
        removed: [],
        changed: []
    }

    const LO = oldList.length
    const LN = newList.length
    oldList.sort((a, b) => a.id - b.id)
    newList.sort((a, b) => a.id - b.id)
    let oldPtr = 0
    let newPtr = 0
    while (oldPtr < LO && newPtr < LN) {
        const old = oldList[oldPtr]
        const new = newList[newPtr]
        if (old.id === new.id) {
            const fields = []
            // 因为我看题目没有说新增字段，所以就直接取旧对象的属性进行比较
            const keys = Object.keysOf(old)
            for (const key of keys) {
                if (old[key] !== new [key]) {
                    fields.push({
                        field: key,
                        oldVal: old[key],
                        newVal: new [key]
                    })
                }
            }
            ans.changed.push({
                id: old.id,
                fields: fields
            })
            oldPtr++
            newPtr++
        }
        else if (old.id < new.id) {
            ans.removed.push(old)
            oldPtr++
        }
        else if (old.id > new.id) {
            ans.added.push(new)
            newPtr++
        }
    }

    // 剩余情况处理
    while (oldPtr < LO) {
        ans.removed.push(oldList[oldPtr])
        oldPtr++
    }
    while (newPtr < LN) {
        ans.added.push(newList[newPtr])
        newPtr++
    }

    return ans
}
// 思路：双指针比较，利用排序后的id进行判断是哪种类型的变更
// 并且题目说层数只需要一层，所以也不用写边界条件去递归DFS
