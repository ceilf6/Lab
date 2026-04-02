setImmediate(() => console.log('Immediate'))

process.nextTick(() => {
    console.log('nextTick')
    process.nextTick(() => console.log('nextTick => nextTick'))
})

console.log('同步代码')

Promise.resolve().then(() => {
    console.log('pro')
    Promise.reject().catch(() => console.log('pro => pro'))
    process.nextTick(() => console.log('pro => nextTick'))
})

/*
同步代码
nextTick
nextTick => nextTick
pro
pro => pro
pro => nextTick
Immediate
*/