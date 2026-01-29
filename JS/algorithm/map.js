// 自定义Map实现：哈希表 + 双向链表

// 双向链表节点
class MapNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.prev = null
        this.next = null
    }
}

class MyMap {
    constructor() {
        this.cache = {} // 哈希表：存储 key -> node 的映射
        this._size = 0

        // 双向链表：维护插入顺序
        this.head = new MapNode(null, null) // 虚拟头节点
        this.tail = new MapNode(null, null) // 虚拟尾节点
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    // 获取唯一的key标识（处理对象作为key的情况）
    _getKeyId(key) {
        // 基本类型直接用作key
        if (key === null) return 'null'
        if (key === undefined) return 'undefined'

        const type = typeof key
        if (type === 'string') return 's_' + key
        if (type === 'number') return 'n_' + key
        if (type === 'boolean') return 'b_' + key
        if (type === 'symbol') return key

        // 对象类型：给对象添加唯一标识
        if (type === 'object' || type === 'function') {
            if (!key.__mapKeyId__) {
                Object.defineProperty(key, '__mapKeyId__', {
                    value: 'obj_' + Math.random().toString(36).substr(2, 9),
                    enumerable: false,
                    writable: false
                })
            }
            return key.__mapKeyId__
        }

        return String(key)
    }

    // 添加节点到链表尾部（保持插入顺序）
    _addToTail(node) {
        node.prev = this.tail.prev
        node.next = this.tail
        this.tail.prev.next = node
        this.tail.prev = node
    }

    // 从链表中移除节点
    _removeNode(node) {
        node.prev.next = node.next
        node.next.prev = node.prev
    }

    // 设置键值对
    set(key, value) {
        const keyId = this._getKeyId(key)

        if (keyId in this.cache) {
            // 已存在，更新值
            const node = this.cache[keyId]
            node.value = value
        } else {
            // 新增节点
            const newNode = new MapNode(key, value)
            this.cache[keyId] = newNode
            this._addToTail(newNode)
            this._size++
        }

        return this
    }

    // 获取值
    get(key) {
        const keyId = this._getKeyId(key)

        if (keyId in this.cache) {
            return this.cache[keyId].value
        }

        return undefined
    }

    // 检查是否存在
    has(key) {
        const keyId = this._getKeyId(key)
        return keyId in this.cache
    }

    // 删除键值对
    delete(key) {
        const keyId = this._getKeyId(key)

        if (keyId in this.cache) {
            const node = this.cache[keyId]
            this._removeNode(node)
            delete this.cache[keyId]
            this._size--
            return true
        }

        return false
    }

    // 清空Map
    clear() {
        this.cache = {}
        this._size = 0
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    // 获取大小
    get size() {
        return this._size
    }

    // 迭代器：按插入顺序返回 [key, value]
    *entries() {
        let current = this.head.next
        while (current !== this.tail) {
            yield [current.key, current.value]
            current = current.next
        }
    }

    // 迭代器：返回所有key
    *keys() {
        let current = this.head.next
        while (current !== this.tail) {
            yield current.key
            current = current.next
        }
    }

    // 迭代器：返回所有value
    *values() {
        let current = this.head.next
        while (current !== this.tail) {
            yield current.value
            current = current.next
        }
    }

    // forEach方法
    forEach(callback, thisArg) {
        let current = this.head.next
        while (current !== this.tail) {
            callback.call(thisArg, current.value, current.key, this)
            current = current.next
        }
    }

    // 使Map可迭代
    [Symbol.iterator]() {
        return this.entries()
    }
}

// ============ 测试代码 ============

const myMap = new MyMap()

// 基本类型作为key
myMap.set('name', 'Alice')
myMap.set(1, 'number one')
myMap.set(true, 'boolean true')

console.log(myMap.get('name'))  // Alice
console.log(myMap.get(1))       // number one
console.log(myMap.size)         // 3

// 对象作为key
const obj1 = { id: 1 }
const obj2 = { id: 2 }
myMap.set(obj1, 'first object')
myMap.set(obj2, 'second object')

console.log(myMap.get(obj1))    // first object
console.log(myMap.has(obj2))    // true
console.log(myMap.size)         // 5

// 按插入顺序迭代
console.log('\n按插入顺序遍历:')
for (let [key, value] of myMap) {
    console.log(key, '=>', value)
}

// 删除
myMap.delete(1)
console.log('\n删除后 size:', myMap.size)  // 4

// keys()
console.log('\n所有keys:')
for (let key of myMap.keys()) {
    console.log(key)
}
