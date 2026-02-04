function Father(prop) {
    this.prop = prop;
}
Father.prototype.func = function () {
}
function Child(prop, extProp) {
    Father.call(this, prop)
    this.extProp = extProp
}
// 目前原型链没有接上，Child的原型直接指向的Object.prototype、其实例无法使用func
// 得将 Child 原型指向 Father 原型
myPlugin.inherit(Child, Father)
Child.prototype.extFunc = function () {
}



// ========= ES6 =========
class Father {
    constructor(prop) {
        this.prop = prop;
    }

    func() {
    }
}

class Child extends Father {
    constructor(prop, extProp) {
        super(prop);
        this.extProp = extProp;
    }

    extFunc() {
    }
}