const fs = require("fs");
fs.readFile("./test1.js", () => {
    setTimeout(() => console.log("Timeout"));
    setImmediate(() => console.log("Immediate"));
});
// poll 之后才会触发函数，所以肯定是先 Immediate
