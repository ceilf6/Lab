// async 返回的一定是 Promise
// 下面三种表示是等价的

async function apro1() {
    return 'apro1';
}

async function apro2(params) {
    return new Promise(
        (resolve, reject) => {
            resolve('apro2')
        }
    )
}

async function apro3(params) {
    return Promise.resolve('apro3')
}

setTimeout(() => console.log(apro1, apro1()), 2000);
setTimeout(() => console.log(apro2, apro2()), 2000);
setTimeout(() => console.log(apro3, apro3()), 2000);

// await 一定是 Promise
// 如果不是的话会隐式转换
(async () => {
    const data1 = await 1;
    const data2 = await Promise.resolve(2);
    console.log(data1);
    console.log(data2);
})()