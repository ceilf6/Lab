const remoteAdd = (a, b) =>
    new Promise(resolve => {
        setTimeout(() => resolve(a + b), 100);
    });

async function add1(...inputs) {
    const L = inputs.length;

    if (L === 0) return 0;
    if (L === 1) return inputs[0];

    const MID = Math.floor(L / 2);

    const [left, right] = await Promise.all([
        add1(...inputs.slice(0, MID)),
        add1(...inputs.slice(MID))
    ]);

    return remoteAdd(left, right); // 不应该用ans+=，因为这里需要用异步的服务
}

const target = [1, 2, 3, 4, 5, 6];

const add1start = Date.now();
console.log('=== add1二分开始 ===')
add1(...target).then(res => {
    const add1end = Date.now();
    console.log(`=== add1结束，答案 ${res} ，用时 ${add1end - add1start} ms ===`)
})
// 别忘记展开，因为形参就是 ...一个数组

async function add2(...inputs) {
    const tasks = [...inputs];

    while (tasks.length > 1) {
        const a = tasks.shift();
        const b = tasks.shift();

        const res = await remoteAdd(a, b);
        tasks.push(res);
    }

    return tasks[0];
}
const add2start = Date.now();
console.log('=== add2开始 ===')
add2(...target).then(res => {
    const add2end = Date.now();
    console.log(`=== add2结束，答案 ${res} ，用时 ${add2end - add2start} ms ===`)
})

async function add3(nums) {
    let tasks = [...nums];

    while (tasks.length > 1) {
        const nextRound = [];
        const promises = [];

        for (let i = 0; i < tasks.length; i += 2) {
            if (i + 1 < tasks.length) {
                promises.push(
                    remoteAdd(tasks[i], tasks[i + 1])
                );
            } else {
                // 奇数个，直接进入下一轮
                nextRound.push(tasks[i]);
            }
        }

        const results = await Promise.all(promises);
        tasks = nextRound.concat(results);
    }

    return tasks[0];
}
const add3start = Date.now();
console.log('=== add3开始 ===')
add2(...target).then(res => {
    const add3end = Date.now();
    console.log(`=== add3结束，答案 ${res} ，用时 ${add3end - add3start} ms ===`)
})