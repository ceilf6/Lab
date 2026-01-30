const pro1 = new Promise((resolve, reject) => {
    // Promise 首次状态改变只能通过 resolve / reject 单向不可逆
    resolve(1);
    reject(1);
})

const pro2 = pro1.then(res => {
    // 在链中通过 return / throw
    return res + 1;
})

const pro3 = pro2.then(res => {
    throw res + 1;
})

const pro4 = pro3.catch(e => {
    return e + 1;
})

setTimeout(() => {
    console.log(pro1, pro2, pro3, pro4)
}, 1000)