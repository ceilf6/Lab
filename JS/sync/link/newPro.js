const pro1 = new Promise((resolve, reject) => {
    resolve();
});

let pro3;

const pro2 = pro1.then(() => {
    pro3 = new Promise((resolve, reject) => { });
    return pro3;
});

setTimeout(() => {
    console.log(pro2);
    /*
    由于 pro2 返回的新任务没有结束
    那么 pro2 和 pro3 状态都是
    Promise { <pending> }
    */
    console.log(pro3);
}, 1000);

const pro21 = new Promise((resolve, reject) => {
    resolve();
});

let pro23;

const pro22 = pro1.then(() => {
    pro23 = new Promise((resolve, reject) => { resolve(23) });
    return pro23;
});

setTimeout(() => {
    console.log(pro22);
    console.log(pro23);
}, 1000);