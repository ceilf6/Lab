const p = Promise.resolve(42);
console.log('hello'); 
p.then(v => console.log(v));