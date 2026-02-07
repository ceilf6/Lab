function outer() {
    let count = 0;

    return function inner() {
        count++;
        console.log("count =", count);
    };
}

const fn = outer();  // outer 执行完了

fn(); // count = 1
fn(); // count = 2
fn(); // count = 3