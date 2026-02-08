// === 1 ===
// Promise 链实现：通过维护一个 promise 链，每次调用方法追加 .then()
function LazyManPromise(name) {
    this.name = name
    // 维护 this.promise 延迟启动的 Promise 作为链的起点，确保链式调用全部完成后，再开始执行任务
    // new Promise() 创建时 立即执行 executor 函数
    this.promise = new Promise(resolve => {
        setTimeout(() => {
            console.log(`I am ${this.name}`)
            resolve()
        }, 0)
    })
}

LazyManPromise.prototype.rest = function (time) {
    // 在现有 Promise 链后追加新的异步操作
    this.promise = this.promise.then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Wake up after ${time}s`)
                resolve()
            }, time * 1000)
        })
    })
    return this // 返回 this 支持链式调用
}

LazyManPromise.prototype.firstRest = function (time) {
    // 创建新的 Promise 链，将原链追加到后面
    const oldPromise = this.promise
    this.promise = new Promise(resolve => {
        setTimeout(() => {
            console.log(`Wake up after ${time}s`)
            resolve()
        }, time * 1000)
    }).then(() => oldPromise)
    return this
}

LazyManPromise.prototype.learn = function (what) {
    this.promise = this.promise.then(() => {
        console.log(`Learning ${what}`)
    })
    return this
}

function HardmanPromise(name) {
    return new LazyManPromise(name)
}

console.log('=== Promise 链实现 ===')
HardmanPromise("Tom").rest(1).learn("Math")

setTimeout(() => {
    console.log('\n=== Promise firstRest 测试 ===')
    HardmanPromise("Jack").firstRest(1).learn("English")
}, 3000)


// === 2 ===
// 通过 任务队列task,next() 进行管理
function LazyMan(name) {
    this.name = name
    this.task = [() => {
        console.log(`I am ${this.name}`)
        this.next() // 执行完后继续下一个任务
    }]

    // 延迟启动，确保链式调用完成后再执行
    setTimeout(() => {
        this.next()
    }, 0)
}

// 执行下一个任务
LazyMan.prototype.next = function () {
    const task = this.task.shift()
    task && task.call(this) // 使用 call 绑定 this
}

LazyMan.prototype.rest = function (time) {
    this.task.push(() => {
        setTimeout(() => {
            console.log(`Wake up after ${time}s`)
            this.next() // 休息结束后继续执行
        }, time * 1000)
    })
    return this // 返回this进而支持装饰器模式链式调用，例如 .rest(time).rest()/.learn
}

LazyMan.prototype.firstRest = function (time) {
    this.task.unshift(() => {
        setTimeout(() => {
            console.log(`Wake up after ${time}s`)
            this.next()
        }, time * 1000)
    })
    return this
}

LazyMan.prototype.learn = function (what) {
    this.task.push(() => {
        console.log(`Learning ${what}`)
        this.next() // 执行完后继续
    })
    return this
}

// 工厂函数
function Hardman(name) {
    return new LazyMan(name)
}

// 测试
console.log('=== 原型链实现 ===')
Hardman("jack").rest(2).learn("computer")


// === 3 ===
// 任务队列的类实现
class LazyMan2 {
    constructor(name) {
        this.name = name
        this.tasks = [] // 任务队列

        // 添加初始任务
        this.tasks.push(() => {
            console.log(`I am ${this.name}`)
            this.next()
        })

        // 在下一个事件循环中开始执行任务队列
        setTimeout(() => {
            this.next()
        }, 0)
    }

    // 执行下一个任务
    next() {
        const task = this.tasks.shift()
        task && task()
    }

    // 休息
    rest(time) {
        this.tasks.push(() => {
            setTimeout(() => {
                console.log(`Wake up after ${time}s`)
                this.next()
            }, time * 1000)
        })
        return this // 返回 this 支持链式调用
    }

    // 优先休息（插入队列头部）
    firstRest(time) {
        this.tasks.unshift(() => {
            setTimeout(() => {
                console.log(`Wake up after ${time}s`)
                this.next()
            }, time * 1000)
        })
        return this
    }

    // 学习
    learn(subject) {
        this.tasks.push(() => {
            console.log(`Learning ${subject}`)
            this.next()
        })
        return this
    }

    // 吃东西
    eat(food) {
        this.tasks.push(() => {
            console.log(`Eat ${food}`)
            this.next()
        })
        return this
    }
}

// 工厂函数
function Hardman2(name) {
    return new LazyMan2(name)
}

// 测试用例
console.log('=== Test 1 ===')
Hardman2("jack").rest(2).learn("computer")
/*打印：
I am jack
Wake up after 2s
Learning computer */

// setTimeout(() => {
//     console.log('\n=== Test 2 ===')
//     Hardman("jack").firstRest(2).learn("computer")
//     /* 打印：
//     Wake up after 2s
//     I am jack
//     Learning computer */
// }, 5000)

// setTimeout(() => {
//     console.log('\n=== Test 3 ===')
//     Hardman("Tom").eat("lunch").rest(1).learn("English")
//     /* 打印：
//     I am Tom
//     Eat lunch
//     Wake up after 1s
//     Learning English */
// }, 10000)