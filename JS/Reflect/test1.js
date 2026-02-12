const obj = {
    a: 1,
    b: 2
}

// obj.a = 10;

Reflect.set(obj, "a", 10);

console.log(Reflect.get(obj, "a"))