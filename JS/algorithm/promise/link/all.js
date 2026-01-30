const pro = Promise.all(
    [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
    ]
)

pro.then(res => {
    console.log(pro);
    console.log(res); // all 的 return 就是结果数组
})