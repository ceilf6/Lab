function Construct(name) {
    this.name = name
    this.notShareFunc = function () {
        console.log('I\'m not shared')
    }
}

// func.prototype === objs.__proto__
Construct.prototype.shareFunc = function () {
    console.log('I\'m shared')
}

const obj1 = new Construct();
const obj2 = new Construct();

console.log('obj1.notShareFunc == obj2.notShareFunc', obj1.notShareFunc == obj2.notShareFunc) // false
console.log('obj1.shareFunc == obj2.shareFunc', obj1.shareFunc == obj2.shareFunc) // true