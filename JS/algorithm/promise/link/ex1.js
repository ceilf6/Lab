const pro1 = new Promise((resolve, reject) => {
    // Promise 传入函数的参数为状态改变函数 resolve / reject
    resolve(1);
    reject(1);
})

const pro2 = pro1.then(res => {
    // 在链中没有状态改变函数，得通过 return / throw
    throw res + 1;
})

const pro3 = pro2.catch(e => {
    return e + 1;
})

// Promise { 1 } Promise { <rejected> 2 } Promise { 3 }

setTimeout(() => {
    console.log(pro1, pro2, pro3)
}, 1000)