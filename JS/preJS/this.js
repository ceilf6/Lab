//(function(){  // 开IIFE的话会导致打开严格模式，this指向undefined
function foo(){
    console.log(this.a);
}

function obj(n){
    return{
        a:n,
        foo:foo,
    }
}

var obj1=obj(1);
var obj2=obj(2);
obj2.obj1=obj1; // obj2 的 obj 属性指向 obj1

obj2.obj1.foo(); // 隐式绑定只看上一层：输出 obj1


var a='global';
var foo1=obj2.obj1.foo;
foo1();
var foo2=obj2.foo;
foo2(); // 由于前面没有引用，所以是默认绑定到全局对象上：输出 global
        // 用了 IIFE时，会导致开启严格模式，this 指向了 undefined


(obj(2).foo=obj(1).foo)();
        // 赋值：间接引用：回到默认绑定


foo.call(obj(3)); // 显式将foo的this绑定到obj2上并且调用其（由于foo本身不需要其他参数所以没必要传递参数）
foo.apply(obj(3)); // .call 和 .apply 的区别在于传递参数的方式，.call 直接传递参数，而 .apply 接受一个数组作为参数


var foo4=foo.bind(obj(4)); // 硬绑定，创建一个新的函数，this 永远指向 obj4
foo4(); // 输出 obj4


function foon(n){
    this.a=n;
    foo();
    return 'foon内部返回值';
}
console.log(foon(5)); // 先输出 5，因为内部进行函数的构造调用后 this 指向了 foon 的实例，并自动执行函数体
                    // 在输出 5 之后控制台打印 'foon内部返回值'，因为 foon 函数返回了这个字符串，所以不会返回新的对象


var obj6=obj.bind(6);
var obj7=new obj6(7);
console.log(obj7.a); // 如果对硬绑定函数进行 new 构造操作，当有新的 this 被创建时会替换原先硬绑定的this
//})(); // IIFE 立即执行函数表达式，避免全局作用域污染




var obj = {
	i: 10,
	b: () => console.log(this.i, this), // undefined, Window{...}
	c: function () {
		const log = () => console.log(this.i, this); // 10, Object {...}
        log(); // 10, Object {...}
    }
};
obj.b();
obj.c();