if (!this.myPlugin) {
    this.myPlugin = {};
}

/**
 * 实现子类衔接上父类的原型链
 */
this.myPlugin.inherit = function (Child, Father) {
    // 如果直接 child.prototype = father.prototype 会造成原型污染
    /* ES5 前、没有Object.create
    var Temp = function () { }
    Temp.prototype = Father.prototype // Temp实例.__poto__ 跟着指向了
    Child.prototype = new Temp(); // 那么就利用 Temp 实例的指向
    可以利用闭包加立即执行函数管理 Temp 函数
    */
    Child.prototype = Object.create(Father.prototype)

    // 但是目前没有 constructor ，从原型链上找的 Father 的
    Child.prototype.constructor = Child;

    // 圣杯模式：方便子类获取父类
    // ES5 之后直接 Object.getPrototypeOf(Child.prototype)
    Child.prototype.uber = Father.prototype; // 父类
};