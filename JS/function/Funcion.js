// Function → 产生函数对象 → 创造普通对象
// Function → newObj → obj
function newObj(name, age) {
    this.name = name;
    this.age = age
}
const obj = new newObj('ceilf6', 20)
console.log(newObj)
obj.newAttribute = 'test'
console.log(obj)