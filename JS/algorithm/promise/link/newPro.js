const pro1 = new Promise((resolve, reject) => {
    resolve();
});

const pro2 = pro1.then(() => {
    return new Promise((resolve, reject) => { });
});

setTimeout(() => {
    console.log(pro2);
}, 1000);