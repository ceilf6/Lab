const obj = {}
let value;
const watchList = [];

Object.defineProperty(obj, "att", {
    get() {
        if (Dep.target) {
            watchList.push(Dep.target) //  watcher 在访问前被临时挂到了 Dep.target 上
        }
        return value
    },
    set(val) {
        value = val
        watchList.forEach(w => w())
        // 通知（回调）
    }
})