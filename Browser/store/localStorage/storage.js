// 封装做 undefined 和 JSON 格式化处理

const storage = {
    set(key, value) {
        if (value === undefined) return
        localStorage.setItem(key, JSON.stringify(value))
    },

    get(key) {
        const value = localStorage.getItem(key)
        try {
            return value ? JSON.parse(value) : null
        } catch (e) {
            return value
        }
    },

    remove(key) {
        localStorage.removeItem(key)
    },

    clear() {
        localStorage.clear()
    }
}

export default storage