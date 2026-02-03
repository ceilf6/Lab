function createObj(name = 'ceilf5', age = 5) { // 注意是在形参位置设置默认值
    // 构造函数：用于创建对象
    // 即返回对象
    return {
        name: name,
        age: age,
        // 可以简写为 age
        sayHello() {
            console.log(`I'm ${name}, ${age} years old`)
        }
    }
}

const o1 = createObj('ceilf6', 20);
const o2 = createObj('ceilf7', 22);
o1.sayHello();
o2.sayHello();

const o3 = createObj();
const o4 = createObj();
o3.sayHello();
o4.sayHello();
console.log('o3 === o4:', o3 === o4)