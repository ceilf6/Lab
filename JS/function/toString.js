const obj = new Object();
const str = new String();

console.log(obj.toString())
console.log(Object.prototype.toString.call(obj)) // [object Object]
console.log(Object.prototype.toString.call(str)) // [object String]

/*
JS 对象有内部槽 [[Class]]
ES5 规定 Object.prototype.toString 返回
"[object " + [[Class]] + "]"
*/