/*
在Promise后，async/await 出来前，有段时间社区使用co第三方库，将异步逻辑写成同步形式一个个串起来执行到底
co 是一个通过next自动执行 Promise.then() 链的控制器，基于 Generator 的 yield 暂停机制
*/

/*
通过生成器的 next（继续执行then链） 和 throw（抛出异常） 方法来控制异步流程
每次迭代时，将yield的值作为Promise的resolve值传递给下一个next调用
错误自动捕获
*/

function myCo(genFunc){ // 接受生成器函数
    return new Promise((resolve, reject) => { // co函数返回一个新的 Promise 实例
        const gen = genFunc(); // 执行生成器函数，获得迭代器对象 gen
        
        function handleResult(result) {
            if(result.done){ // 如果迭代器已经完成
                resolve(result.value); // 返回最终值
            }else{
                const promise = result.value; // 获取当前迭代的值（应该是一个 Promise）
                if(promise instanceof Promise){ // 如果是 Promise，等待其完成
                    promise.then(
                        value => handleResult(gen.next(value)), // 成功时继续迭代
                        error => handleResult(gen.throw(error))  // 失败时抛出异常
                    );
                }else{
                    handleResult(gen.next(promise)); // 如果不是 Promise，直接继续迭代
                }
            }
        }


        // 开始迭代
        try{
            handleResult(gen.next());
        }catch(error){ // 自动捕获错误
            reject(error);
        }
    });
}


/* 生成器函数示例 */
function* asyncTasks() {
    const res1 = yield Promise.resolve('Task 1 completed');
    // 等待：当碰到yield时，函数会暂停，co等待这个Promise完成
                            // 继续：当Promise完成后，co会调用 next 方法继续执行
}