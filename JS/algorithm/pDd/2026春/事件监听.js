// 1. 事件监听机制
function createEventBus() {
    this.listeners = new Map()
}

// 只有_内部函数才能操作 listeners
// 在内部用于添加回调函数的工具函数
// 通过单调递增的 id 确保不会因为删除而有重复 id
createEventBus.prototype._add = function (event, handler, once) {
    if (!this.listeners.has(event)) { // 初始化
        this.listeners.set(event, [0])
    }
    const pre = this.listeners.get(event)
    const newId = pre[0] + 1
    const curObj = {
        id: newId,
        handler: handler,
        once: once // 是否只执行一次就移除 // 注意变量名的统一
    }
    const newVal = [...pre, curObj]
    newVal[0] = newId
    this.listeners.set(event, newVal)
    return newId // 返回 newId 用于删除
}

// 在内部用于删除回调函数的工具函数
createEventBus.prototype._delete = function (event, id) {
    const cur = this.listeners.get(event)
    if (cur[0] < id) return false // 如果最大的 id 都比当前输入的小，那么肯定输错了
    let targetIdx = -1
    for (let i = 0; i < cur.length; i++) {
        if (cur[i].id === id) {
            targetIdx = i
            break
        }
    }
    // 或者用 .filter 筛除
    if (targetIdx === -1) return false
    cur.splice(targetIdx, 1)
    this.listeners.set(event, cur)
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
    if (!arr) return // 防空处理
    // for (const item of arr) {
    for (let i = 1; i < arr.length; i++) { // 注意[0]存储的是ID
        const item = arr[i]
        item.handler(...args) // 注意传参
        if (item.once) {
            this._delete(event, item.id)
        }
    }
}
// 思路：内部通过listeners映射维护监听者数组，并且
// 只有_内部函数才能操作 listeners
// 在内部用于添加回调函数的工具函数
// 通过单调递增的 id 确保不会因为删除而有重复 id


const bus = new createEventBus()
bus.on('click', name => console.log(`你好 ${name}`))
bus.emit('click', 'ceilf6')