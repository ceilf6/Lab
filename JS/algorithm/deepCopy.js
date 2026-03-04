// 用记忆化解决循环引用问题：如果某个对象已经拷贝过了，就直接返回之前的拷贝
// 映射: 原对象 -> 拷贝对象
function deepCopy(from, vis = new WeakMap()) {
    if (vis.has(from))
        return vis.get(from)
    if (Object.prototype.toString.call(from) === '[object Object]') {
        const to = {}
        vis.set(from, to)
        for (const key of Object.keys(from)) {
            to[key] = deepCopy(from[key], vis) // 注意得用属性计算符 [] 而不是 .
        }
        return to
    }
    else if (Object.prototype.toString.call(from) === '[object Array]') {
        const to = []
        vis.set(from, to)
        for (const item of from) {
            to.push(deepCopy(item, vis))
        }
        return to
    }
    else {
        return from
    }
}



// const vis = new Set() // 通过将访问过的对象放入到 vis 中实现记忆，防止循环引用
// 不用 hash 因为正是要判断引用数据类型的引用地址
function deepCopy(from, vis = new Set()) { // vis不要污染外部，并且需要保证是自己的上层而不是其他分支的上层
    if (vis.has(from))
        throw new Error('circular reference')
    if (Object.prototype.toString.call(from) === '[object Object]') {
        vis.add(from)
        const to = {}
        for (const key of Object.keys(from)) {
            to[key] = deepCopy(from[key], vis) // 注意得用属性计算符 [] 而不是 .
        }
        vis.delete(from) // 注意 归 后需要删除
        return to
    }
    else if (Object.prototype.toString.call(from) === '[object Array]') {
        const to = []
        for (const item of from) {
            to.push(deepCopy(item, vis))
        }
        return to
    }
    else {
        return from
    }
}