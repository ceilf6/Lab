const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const a = (await readline()).split('').map(it => Number(it))
    const idxs = a.reduce((s, it, idx) => { // reduce 支持第三个参数 idx
        if (it)
            s.push(a.length - idx)
        return s
    }, [])

    // 注意特殊情况！！
    if (idxs.length === 1) {
        console.log('0')
        return
    }
    if (idxs.length === 0) {
        console.log('1')
    }

    // console.log(idxs)
    let ans = ''
    while (idxs.length > 1) {
        let cur = idxs.pop()
        // while(ans.length < cur-1){
        ans = '0'.repeat((cur - 1) - ans.length) + ans
        // }
        ans = '1' + ans
        while (idxs[idxs.length - 1] === cur + 1) {
            idxs.pop()
            cur++ // 连锁倾销
        }
        idxs.push(cur + 1)
    }
    console.log(ans)
}()
