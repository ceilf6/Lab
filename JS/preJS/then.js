let p1=Promise.reject('foo');

let p3=p1.then(null,()=>undefined);
let p4=p1.then(null,()=>{throw 'bar';});
let p5=p1.then(null,()=>Promise.resolve());

let p8=p1.then(null,()=>new Promise(()=>{}));