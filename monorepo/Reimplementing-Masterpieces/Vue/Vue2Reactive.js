/*
Vue2 通过 Object.defineProperty 监听、挟持数据，实现响应式
并通过 Dep（依赖收集器） 和 Watcher 实现依赖收集，通知视图更新
*/

/*
但是 Vue2用Object.defineProperty 无法监听新增属性、无法监听数组索引变化、无法监听数组长度变化
*/

// 依赖收集器
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => sub.update());
    }
}

Dep.target = null;

// Observer 数据劫持
// 激活 get,set 函数
function Vue2Reactive(obj, key, val) {
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        get() {
            // 依赖收集
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        },
        set(newVal) {
            if (newVal !== val) {
                val = newVal;
                // 通知视图更新
                dep.notify();
            }
        }
    });
}
// 通过 Object.keys(obj) + forEach 遍历对象的所有属性都进行激活
function activeAllProperties(obj) {
    if (typeof obj !== 'object' || obj === null) return;

    Object.keys(obj).forEach(key => {
        Vue2Reactive(obj, key, obj[key]);
    });
}


// Watcher 类
class Watcher {
    constructor(vm, key, callback) {
        this.vm = vm;
        this.key = key;
        this.callback = callback;
        this.value = this.get();
    }
    
    get() {
        Dep.target = this;
        const value = this.vm[this.key];
        Dep.target = null;
        return value;
    }
    
    update() {
        const newValue = this.vm[this.key];
        if (newValue !== this.value) {
            this.value = newValue;
            this.callback(newValue);
        }
    }
}