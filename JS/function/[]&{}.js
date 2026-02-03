// {} 语法糖
const obj1 = { x: valX };

const obj2 = new Object();

const obj3 = Object.create(Object.prototype);
obj.x = valX

// [] 语法糖
const arr1 = ['hello'];

const arr2 = new Array();

const arr3 = Object.create(Array.prototype);
arr[0] = 'hello';
arr.length = 1;