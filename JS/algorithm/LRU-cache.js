class LRUCache {
    constructor(capacity) {
        this.map = new Map()
        this.space = capacity
    }

    get(key) {
        if (!this.map.has(key)) return -1

        // get 也要刷新地位
        const value = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, value)
        return value
    }

    put(key, value) {
        if (this.map.has(key)) this.map.delete(key) //别忘记刷新地位

        this.map.set(key, value)

        if (this.map.size > this.space) { // 注意是 size 而不是 length
            const last = this.map.keys().next().value; // keys().next().value
            this.map.delete(last)
        }
    }
}

// ============ 不使用Map的实现：使用对象 + 双向链表 ============

// 双向链表节点
class DLLNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.pre = null
        this.next = null
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.cache = {} // 对象存储 key -> node 的映射
        this.size = 0

        // 虚拟头尾节点，方便操作
        this.head = new DLLNode(0, 0) // head.next 才是头
        this.tail = new DLLNode(0, 0) // tail.pre 才是尾
        this.head.next = this.tail
        this.tail.pre = this.head
    }

    // 将节点添加到头部 - 头部是最近使用的
    addToHead(node) {
        node.pre = this.head
        node.next = this.head.next
        this.head.next.pre = node
        this.head.next = node
    }

    // 移除节点
    removeNode(node) {
        node.pre.next = node.next
        node.next.pre = node.pre
    }

    // 移动到头部 - 刷新地位
    moveToHead(node) {
        this.removeNode(node)
        this.addToHead(node)
    }

    // 移除尾部节点，同时返回被移除节点方便维护cache映射
    removeTail() {
        const node = this.tail.pre
        this.removeNode(node)
        return node
    }

    get(key) {
        if (!(key in this.cache)) return -1

        const node = this.cache[key]
        this.moveToHead(node) // get 也要刷新地位
        return node.value
    }

    put(key, value) {
        if (key in this.cache) {
            // 已存在，更新值并移到头部
            const node = this.cache[key]
            node.value = value
            this.moveToHead(node)
        } else {
            // 新节点
            const newNode = new DLLNode(key, value)
            this.cache[key] = newNode
            this.addToHead(newNode)
            this.size++

            if (this.size > this.capacity) {
                // 移除最久未使用的（尾部）
                const tailNode = this.removeTail()
                delete this.cache[tailNode.key]
                this.size--
            }
        }
    }
}