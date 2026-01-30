const pro1 = new Promise((resolve, reject) => {
    // console.log('pro1 rejected');
    resolve('pro1 resolve');
})

const pro2 = pro1.then(() => { }) // even is () => {} ,it's not empty

const pro3 = pro1.then();

setTimeout(() => {
    console.log('pro2', pro2);

    console.log('pro3', pro3);
}, 1000)
