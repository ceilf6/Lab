const wait = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('async2-wait-1');
        resolve('async-3');
        console.log('async2-wait-2');
    }, 1000);
})

async function asyncInside() {
    console.log('async1');
    try {
        const res = await wait; // 注意 wait 是一个 Promise 对象，不应该像函数一样 wait()
    } catch (e) {
        console.log(e)
    }
    console.log(res);
}

asyncInside();
console.log('outFunc');