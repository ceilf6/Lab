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
    .then((res) => {
        console.log(res);
    });