const pro1 = new Promise((resolve, reject) => {
    // console.log('pro1 rejected');
    reject('pro1 rejected');
})

const pro2 = pro1.catch(res => {
    console.log('pro2 not empty');
    return 2;
})

setTimeout(() => {
    console.log(pro2);
}, 1000)

const pro3 = pro1.catch(res => {
    console.log('pro3 not empty');
    throw 3;
    return 2;
})

setTimeout(() => {
    console.log(pro3);
}, 1000)