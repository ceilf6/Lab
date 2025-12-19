/*
异步的本质是        等待       +       继续 （并通过事件循环机制利用等待时间）

Promise        等resolve         进入.then()回调继续
co             yield             next
async/await    await             await后面的“同步”代码

*/


/*
#不可逆性
#私有性
#异常传播
#thenable接口：对成功返回值的特殊处理
#不可取消性

.status
.value
.reason
.onFulfilled_CBs
.onRejected_CBs
.then(onFulfilled, onRejected)
.catch(onRejected)
.finally(CB)
.resolve(value)
.reject(reason)
.all(promises)
.allSettled(promises)
.any(promises)
.race(promises)
*/

/*Promise/A plus:
thenable的 .then() 只能被调用一次（可以通过在value判断thenable分支下面加一个 flag 判断：只要调用过一次就置反）
防循环：.then() 返回的Promise不能是自己（通过闭包实现判断结果是不是自己）
*/
class myPromise{
    constructor(excutor){ // 传入执行器函数（它是同步执行的）

        this.status = 'pending'; // 初始状态 pending ，后面会不可逆地、一次性地转为 fulfilled 或者 rejected

        this.value = undefined;  // 成功返回值
        this.reason = undefined; // 失败返回值

        /* 等待回调池：当 Promise 状态改变时决定两者中的哪一个进入微任务队列，二者是对立的 */
        this.onFulfilled_CBs = []; // 成功的回调队列
        this.onRejected_CBs = [];  // 失败的回调队列
        /* Promise 中通过两个静态方法 resolve 和 reject 其一来改变状态 */
        const resolve = (value) => {
            if(this.status === 'pending'){ // 通过判断实现不可逆性

                if(value && typeof value.then === 'function'){
                    // #thenable: 如果成功返回值value 是 thenable（即有 then 方法的对象），则应该等待其状态
                    value.then(resolve, reject);
                    return;
                }

                this.status = 'fulfilled'; // 改变状态
                this.value = value;        // 保存成功返回值
                queueMicrotask(() => {     // 将成功回调队列都压入微任务队列
                    this.onFulfilled_CBs.forEach(fn => fn(value));
                });
            }
        }
        const reject = (reason) => {
            if(this.status === 'pending'){ // 通过判断实现不可逆性
                this.status = 'rejected';  // 改变状态
                this.reason = reason;      // 保存失败返回值
                queueMicrotask(() => {     // 将失败回调队列都压入微任务队列
                    this.onRejected_CBs.forEach(fn => fn(reason));
                });
            }
        }

        /* 执行器函数是同步执行的、立即执行的 */
        try{
            excutor(resolve, reject); //传入 resolve 和 reject 函数，在执行器函数内部调用
        }catch(error){
            // Promise/A+规范要求自动检查执行起函数抛出异常并调用 reject，执行器函数是同步执行的，可以用try-catch捕获
            // #私密性：然而reject函数抛出的异常就无法通过try-catch捕获了，得用Promise的.catch()
            reject(error);
        }
    }


    then(onFulfilled, onRejected){

        /* 当传入参数不是回调函数时使用默认函数 */
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;           // 成功：返回原值
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; }; // 失败：抛出异常

        // then方法返回一个新的 Promise 实例
        return new myPromise((resolve, reject) => {
            const handleFulfilled = (value) => {
                try{
                    const result = onFulfilled(value); // 执行成功回调
                    if(result instanceof myPromise){   // 如果返回值是一个 Promise 实例
                        result.then(resolve, reject);  // #thenable: 等待其状态改变
                    }else{
                        resolve(result);               // 否则直接 resolve 返回值
                    }
                }catch(error){
                    reject(error);                     // 捕获异常并 reject
                }
            }
            const handleRejected = (reason) => {
                try{
                    const result = onRejected(reason); // 执行失败回调
                    if(result instanceof myPromise){   // 如果返回值是一个 Promise 实例
                        result.then(resolve, reject);  // #thenable: 等待其状态改变
                    }else{
                        resolve(result);               // 否则直接 resolve 返回值
                    }
                }catch(error){
                    reject(error);                     // 捕获异常并 reject
                }
            }

            if(this.status === 'fulfilled'){                        // 如果当前状态是 fulfilled
                queueMicrotask(() => handleFulfilled(this.value));  // 将成功回调压入微任务队列

            }else if(this.status === 'rejected'){                   // 如果当前状态是 rejected
                queueMicrotask(() => handleRejected(this.reason));  // 将失败回调压入微任务队列

            }else{                                                  // 如果当前状态是 pending
                this.onFulfilled_CBs.push(handleFulfilled);         // 将成功回调和失败回调分别压入对应的队列
                this.onRejected_CBs.push(handleRejected);
            }
        });
    }


    /* catch 方法只是一个语法糖，相当于 then(null, onRejected) */
    catch(onRejected){
        return this.then(null,onRejected);
    }

    
    /* finally 方法在 Promise 状态改变之后（无论是成功还是失败），都会先执行一次传入的回调函数 */
    finally(CB){
        return this.then(
            value => myPromise.resolve(CB()).then(() => value),             // 成功时先执行 CallBack 再返回原值
            reason => myPromise.resolve(CB()).then(() => { throw reason; }) // 失败时先执行 CallBack 再抛出异常
        );
    }


    /* 静态方法（定义在类本身上，而不是实例上）*/
    
    //resolve 和 reject 用于创建一个 Promise 实例（前面的 reslove 和 reject 回调函数参数是用于在执行器函数内部修改状态
    static resolve(value){
        if(value instanceof myPromise){ // 如果传入的值已经是一个 Promise 实例
            return value;                // 直接返回它
        }
        
        if(value && typeof value.then === 'function'){
            // #thenable: 如果传入的值是一个 thenable 对象（有 then 方法），则返回一个新的 Promise 实例
            return new myPromise((resolve, reject) => {
                value.then(resolve, reject); // 等待其状态改变
            });
        }
        // 否则直接返回一个新的 Promise 实例，状态为 fulfilled，传入 value 调用回调函数
        return new myPromise(resolve => resolve(value));
    }

    static reject(reason){
        return new myPromise((_,reject) => reject(reason)); // 返回一个新的 Promise 实例，状态为 rejected
    }


    static all(promises){
        if(promises.length === 0) return myPromise.resolve([]); 
        // 如果传入的数组为空，通过静态方法 resolve 直接返回一个已解决的 Promise，避免永远无法 resolve

        return new myPromise((resolve, reject) => {
            const results = [];
            let completed = 0;

            promises.forEach((p, i) => {
                myPromise.resolve(p).then(
                    value => {
                    results[i] = value;
                    completed++;
                    if(completed === promises.length){
                        resolve(results);
                    }
                }, 
                    reject); // all: 任意一个失败就立即 reject
                             // 并且由于Promise的不可取消性：其他Promise仍然会执行，只不过不会被收集
            });
        });
    }

    static allSettled(promises){
        if(promises.length === 0) return myPromise.resolve([]); 
        // 如果传入的数组为空，通过静态方法 resolve 直接返回一个已解决的 Promise，避免永远无法 resolve

        return new myPromise((resolve) => {
            const results = [];
            let completed = 0;

            promises.forEach((p, i) => {
                myPromise.resolve(p).then(
                    value => {
                    results[i] = { status: 'fulfilled', value };
                    completed++;
                    if(completed === promises.length){
                        resolve(results);
                    }
                }, 
                    reason => {
                    results[i] = { status: 'rejected', reason }; // allSettled: 收集所有 Promise 的结果，无论成功还是失败
                    completed++;
                    if(completed === promises.length){
                        resolve(results);
                    }           
                });
            });
        });
    }

    static race(promises){
        return new myPromise((resolve, reject) => {
            promises.forEach(p => {
                myPromise.resolve(p).then(resolve, reject);
                // race: 谁先 settle（无论成功还是失败）就立即结束
            });
        });
    }

    static any(promises){
        return new myPromise((resolve, reject) => {
            const mubiao = promises.length;
            const errors = [];
            let completed = 0;

            if(mubiao === 0) return reject(new AggregateError([], 'No promises were provided'));
            // 如果传入的数组为空，会抛出 AggregateError 异常，表示没有提供任何 Promise

            promises.forEach(p => {
                // any: 谁先成功返回谁，但是如果都失败了就返回收集的 reasons
                myPromise.resolve(p).then(resolve, reason => {
                    errors.push(reason);
                    completed++;
                    if(completed === mubiao){
                        reject(new AggregateError(errors, 'All promises were rejected'));
                    }
                });
            });
        });
    }
}