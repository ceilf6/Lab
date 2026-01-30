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

// return new Promise 的话就双向绑定了
// JS/algorithm/promise/link/newPro.js

console.log('=============')

const pro21 = new Promise((resolve, reject) => {
    resolve();
});

let pro23;

const pro22 = pro1.then(() => {
    pro23 = new Promise((resolve, reject) => {
        console.log('pro22', pro22); // 同步代码执行块
    });
    throw pro3; // throw 的话就把新任务作为失败原因抛出了，没有绑定
});

setTimeout(() => {
    console.log('pro23', pro23);
}, 1000);