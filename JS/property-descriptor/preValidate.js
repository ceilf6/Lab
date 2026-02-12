obj = {
    name: "ceilf5"
}

Object.defineProperty(obj, "age", {
    get() {
        return obj._age;
    },
    set(val) {
        if (typeof val !== "number") {
            throw new TypeError("年龄必须是一个数字")
        }
        if (val < 0) {
            val = 0;
        } else if (val > 200) {
            val = 200;
        }
        obj._age = val;
    }
})

obj.age = "ceilf6";
console.log(obj.age);