// 直接将函数放入队列，到时候回调，这样做起来更直观
H: [
    () => console.log(4)
]

W: [
    // reRes(2) => console.log(preRes),
    // (() => {
    //     setTimeout(() => console.log(4), 0)
    //     return 5
    // }).then(preRes => console.log(preRes)),

    preRes(5) => console.log(preRes)
]

/*
1
3
2
5
4
*/

new Promise(resolve => {
    console.log(1)
    resolve(2)
}).then(preRes => console.log(preRes))

new Promise(resolve => {
    console.log(3)
    resolve()
}).then(() => {
    setTimeout(() => console.log(4), 0)
    return 5
}).then(preRes => console.log(preRes))