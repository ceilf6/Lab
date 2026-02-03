function A() { }
function B(a) {
    this.a = a;
}
function C(a) {
    if (a) {
        this.a = a;
    }
}
A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;

console.log(new A().a);
// 1
// new A()对象没有a属性，通过隐式原型从原型链往上找，找到了函数A的原型

console.log(new B().a);
// undefined
// new B()对象已经有属性a为undefined了，不需要网上找

console.log(new C(2).a);
// 2
// new C()对象已经有属性a为 2 了，不需要网上找