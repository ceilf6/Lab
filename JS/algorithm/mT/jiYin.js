const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    let l;
    let r;
    while ((line = await readline())) {
        let tokens = line.split(" ");
        l = parseInt(tokens[0]);
        r = parseInt(tokens[1]);
        // console.log(a + b);
    }
    const rF = Math.floor(Math.pow(r, 1 / 2));
    const lF = Math.ceil(Math.pow(l, 1 / 2));
    console.log(rF - lF + 1);
})();
