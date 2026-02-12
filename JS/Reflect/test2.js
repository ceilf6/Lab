function method(a, b) {
    console.log("method", a, b);
}
// method(3, 4);
Reflect.apply(method, null, [3, 4])
// 找到函数的对象内存空间，然后建立上下文…

const obj1 = {
    a: 1,
    b: 2
}

// delete obj1.a;
Reflect.deleteProperty(obj1, "a");

console.log(obj1);

function Test(a, b) {
    this.a = a;
    this.b = b;
}

// const t = new Test(1, 3);
const t = Reflect.construct(Test, [1, 3]);
console.log(t)

const obj = {
    a: 1,
    b: 2
}

// console.log("a" in obj);
console.log(Reflect.has(obj, "a"));