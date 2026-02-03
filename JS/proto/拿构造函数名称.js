function A() { }

function B() { }

function create() {
    if (Math.random() < 0.5) {
        return new A();
    } else {
        return new B();
    }
}

var obj = create();
//拿创建obj的构造函数名称
console.log(obj.__proto__.constructor.name); // obj.__proto === obj构造函数.prototype