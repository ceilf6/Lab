async function async1(){
    console.log('async1 start')
    a=await 'async3';//await右边需要是可表达的式子const a='async4';//async2();
    async3();
    console.log('async1 end')
}

async function async2(){
    console.log('async2')
}

async function async3(){
    console.log(a);//'async3')
}

console.log('script start')
setTimeout(function(){
    console.log('setTimeout')
},0)
// requestAnimationFrame 在 Node.js 中不存在，注释掉或使用 setImmediate 替代
// requestAnimationFrame(function(){
//     console.log('requestAnimationFrame')
// })
setImmediate(function(){
    console.log('setImmediate')
})
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})

console.log('script end')