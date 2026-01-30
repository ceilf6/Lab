const pro = new Promise((resolve, reject) => {
    resolve(1);
})
    .then((res) => {
        // console.log(res);
        return 2;
    })
    .catch((err) => {
        return 3;
    })
    .then((res) => {
        // console.log(res);
    });

// A.b().c().d() 看的是 d 的结果
// 所以是看 pro4
/*
pro1 fulfilled<1>
pro2 fulfilled<2>
pro3 不是后续处理->跟随 fulfilled<2>
pro4 fulfilled<undefined>
*/

setTimeout(() => {
    console.log(pro);
}, 1000)