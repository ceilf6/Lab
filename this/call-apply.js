Function.prototype.myCall = function(thisArg, ...args) {
    // call函数会在对象为 undefined 或 null 时用默认规则指向全局对象
    if(thisArg === undefined || thisArg === null){
        thisArg = typeof window !=='undefined' ? global:window;
    }

    const key=Symbol('fn'); // 使用 Symbol 避免冲突

    thisArg[key] = this; // 挂载函数作为对象的一个属性，利用隐式绑定规则实现显式绑定

    const res = thisArg[key](...args); // 传入参数、执行函数
    /* apply 和 call 的区别在于传入参数的方式不同，apply 是数组形式
    const res = args ? thisArg[key](...args) : thisArg[key]();
    */

    delete thisArg[key]; // 删除挂载的属性，防止内存泄漏，并保持对象原始属性结构

    return res;
}