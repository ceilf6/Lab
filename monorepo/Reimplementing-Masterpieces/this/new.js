function myNew(constructor,...args){
    // 1.创建空对象
    const obj={};
    // 2.链接原型，共享方法和属性
    obj.__proto__=constructor.prototype;
    // 3.执行构造函数，this指向新对象
    const result=constructor.apply(obj,args);
    // 4.决定返回值：返回新对象或构造函数返回值
                // 如果构造函数有 return 值且是对象，则返回该对象，否则返回新对象
    return typeof result==='object' && result!==null ? result : obj;
}                                       // 所以 null 的 typeof 是 'object' 不能被修复