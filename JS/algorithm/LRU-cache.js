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
            const last = this.map.keys().next().value;
            this.map.delete(last)
        }
    }
}