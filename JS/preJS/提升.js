let x = 20,
	y = 10;

// var add =10;

let result = add(x);
console.log("result1 " + result); // "result1 60"

var add = function(a, b) {
	return a + b;
}

function add(a) {
	return a + 40;
}
