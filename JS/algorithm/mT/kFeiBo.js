const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    let kq;
    let flag = true;
    const query = [];
    while ((line = await readline())) {
        // console.log(line)
        if (flag) {
            kq = line.split(" ");
            // console.log(kq)
            flag = false;
        } else {
            query.push(Number(line));
        }
    }
    k = Number(kq[0]);
    q = Number(kq[1]);

    const f = new Array(k).fill(1);
    f.push(k);
    let cur = k;
    const nMax = Math.max(...query);
    // console.log(nMax)
    const BASE = 10 ** 9 + 7;
    for (let i = 0; i < nMax - k; i++) {
        cur = cur - f[i] + f[i + k];
        f.push(cur % BASE);
    }
    for (const que of query) {
        console.log(f[que - 1]);
    }
})();
