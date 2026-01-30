// 延迟函数，调用计时器
// 计时不能阻塞主线程，那么就是一个异步任务 -> 返回一个 Promise

function delay(time) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time)
        }
    )
}