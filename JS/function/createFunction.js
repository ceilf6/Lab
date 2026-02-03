import { createRef } from "react";

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


// 构造函数一般是用大驼峰命名
function CreateObj(name = 'ceilf5', age = 5) { // 注意是在形参位置设置默认值
    // 构造函数：用于创建对象
    // 即返回对象
    // return {
    //     name: name,
    //     age: age,
    //     // 可以简写为 age
    //     sayHello() {
    //         console.log(`I'm ${name}, ${age} years old`)
    //     }
    // }
}
// 使用构造函数得用 new 声明，这样就必定返回对象
const newO = new CreateObj()
const o = CreateObj();
console.log('newO', newO)
console.log('o', o)

function CreateObj2(name = 'ceilf5', age = 5) { // 注意是在形参位置设置默认值
    this.name = name;
    this.age = age;

    // 返回原始类型会直接忽略
    // return 1;
    // return 'hello';

    // 返回引用类型会被覆盖
    return new Array(1, 'hello');// [1, 'hello'];
    // [] 其实是语法糖，本质还是 new Array(1, 'hello')
}
const newO2 = new CreateObj2();
console.log('newO2', newO2)