console.log("Global: 代码开始执行，console.log 入栈，执行完后出栈");

function A() {
    console.log("A() 被调用 → A 入栈，console.log 入栈，执行完后 console.log 出栈");

    function B() {
        console.log("B() 被调用 → B 入栈，console.log 入栈，执行完后 console.log 出栈");
    }

    B(); // 调用 B → B 入栈
} // A 执行结束 → A 出栈

A(); // 调用 A → A 入栈