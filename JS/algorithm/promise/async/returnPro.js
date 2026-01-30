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

setTimeout(() => console.log(apro1, apro1()), 2000)
setTimeout(() => console.log(apro2, apro2()), 2000)
setTimeout(() => console.log(apro3, apro3()), 2000)