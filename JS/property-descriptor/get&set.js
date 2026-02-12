const obj = {
    b: 2
}
Object.defineProperty(obj, "a", {
    get() {
        console.log("运行了属性a的get函数")
        // return obj.a // 直接递(没有归)卡死了
        return obj._a;
    },
    set(val) {
        console.log("运行了属性a的set函数", val)
        obj._a = val;
    }
})
// obj.a = 20 + 10; // set(20 + 10)
// console.log(obj.a); // console.log(get())

obj.a = obj.a + 1; // set(obj.a + 1)   set(get() + 1)
// undefined + 1 = NaN
console.log(obj.a);

// console.log(obj.a)

// obj.a = 10;
// console.log(obj.a);