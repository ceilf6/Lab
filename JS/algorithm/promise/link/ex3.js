new Promise((resolve, reject) => {
    throw new Error(1); // 只要处理过程有报错就会 rejected 同时值是 Error(1)
})
    .then((res) => { // then: 跟随 rejected Error(1)
        console.log(res);
        return new Error('2');
    })
    .catch((err) => {
        throw err; // 又抛错误 rejected Error(1)
        return 3;
    })
    .then((res) => { // 不是后续->跟随
        console.log(res);
    }).catch(err => {
        console.log('最终捕获:', err);
    }); // 需要兜底 catch，否则就崩了看不了 P2 结果

// 上面都是 rejected Error(1)


const P2 = new Promise((resolve, reject) => {
    resolve(1); // fulfilled 1
})
    .then((res) => {
        console.log(res);
        return new Error('2'); // fulfilled Error(2)
    })
    .catch((err) => { // 不是后续->跟随 fulfilled Error(2)
        throw err;
        return 3;
    })
    .then((res) => {
        console.log(res); // fulfilled undefined
    }).catch(err => {
        console.log('最终捕获:', err);
    }); // 需要兜底 catch，否则就崩了看不了 P2 结果

setTimeout(() => console.log(P2), 1000)