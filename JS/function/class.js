// 类 = 构造函数 + 原型

class Example1 {
    constructor(name) {
        this.name = name
    }
    sayName() {
        console.log(this.name)
    }
}

function Example1(name) {
    this.name = name;
}
Example1.prototype.sayName = function () {
    console.log(this.name);
};