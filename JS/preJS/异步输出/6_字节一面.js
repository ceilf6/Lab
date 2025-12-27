console.log(1);

setTimeout(() => {
    console.log(2)
});

console.log(Promise.resolve(3));

console.log(Promise.reject(30).catch((err)=>{ // 如果不catch处理的话会报错，then链无法继续
    console.log('抓到错误：',err);
}))

new Promise((resolve) => {
    console.log (4);
    resolve();
}).then(() => {
    console.log (5);
});
