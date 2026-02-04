const obj = new Object()
obj.a = 1
obj.b = 2

Object.prototype.c = 3

const allProp = [];
const ownProp = [];

for (const prop in obj) {
    allProp.push(prop)
    if (obj.hasOwnProperty(prop)) {
        ownProp.push(prop)
    }
}

console.log(allProp) // [ 'a', 'b', 'c' ]
console.log(ownProp) // [ 'a', 'b' ]