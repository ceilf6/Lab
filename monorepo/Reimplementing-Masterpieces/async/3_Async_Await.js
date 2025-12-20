/*
async/await 本质是基于 Generator生成器函数 + Promise 设计思想的语法糖，通过隐藏 yield（即await） 与 Promise 的调用细节，使得我们可以通过 同步的写法实现异步的流程
但是其本质还是JS语言底层的状态机机制和事件循环机制
*/


function myAsync(generatorFunction) {
    return function (...args) {
        const generator = generatorFunction(...args);

        function handleResult(result) {
            if (result.done) return Promise.resolve(result.value);
            return Promise.resolve(result.value).then(
                res => handleResult(generator.next(res)),
                err => handleResult(generator.throw(err))
            );
        }

        return handleResult(generator.next());
    };
}


function myAwait(promise) { // await 即 co 的 yield，这里的myAwait函数用于上交
    return promise.then(
        value => ({ value, done: false }),
        error => { throw error; }
    );
}


// 示例使用
const asyncFunction = myAsync(function* () {
    const result1 = yield myAwait(Promise.resolve("Hello"));
    console.log(result1.value); // 输出: Hello

    const result2 = yield myAwait(Promise.resolve("World"));
    console.log(result2.value); // 输出: World

    return "Done";
});

asyncFunction().then(result => console.log(result)); // 输出: Done