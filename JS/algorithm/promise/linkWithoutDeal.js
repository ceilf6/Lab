const pro1 = new Promise((resolve, reject) => {
    // console.log('pro1 rejected');
    reject('pro1 rejected');
})

const pro2 = pro1.then(res => {
    console.log('pro2 not empty')
})

setTimeout(() => {
    console.log(pro2);
}, 1000)
