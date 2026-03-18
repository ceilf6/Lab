// https://www.nowcoder.com/practice/2e27509b990d4d02a70c0f208f078cdf

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let [n, m] = (await readline()).split(' ').map(it => Number(it))
    const str = await readline()
    const Ws = []
    let idx = str.indexOf('W', 0)
    while (idx !== -1) {
        Ws.push(idx);
        idx = str.indexOf('W', idx + 1);
    }

    if (!Ws.length) {
        console.log(0) // 注意特殊情况
        return
    }
    function check(k) {
        let idx = 0 // 当前已经覆盖第 i 个 W
        let cnt = 0 // 已经使用了刷的次数
        while (idx < Ws.length) {
            cnt++
            const curLast = Ws[idx] + k - 1
            while (idx < Ws.length && Ws[idx] <= curLast) // 覆盖了的
                idx++
        }
        return cnt <= m
    }
    let l = 1
    let r = n
    while (l <= r) {
        const k = Math.floor((l + r) / 2)
        if (check(k)) {
            r = k - 1 // 尝试更小
        } else {
            l = k + 1
        }
    }
    console.log(l)
}()



// 复杂度过高
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // 首先假如 m 只有一次，那么就是看 W 出现的两个极端位置
    // 如果 m = 2 那么进入 W 极端位置中间找最靠近中间的
    // m = 3 再进入
    let [n, m] = (await readline()).split(' ').map(it => Number(it))
    const str = await readline()
    const Ws = []
    let idx = str.indexOf('W', 0)
    while (idx !== -1) {
        Ws.push(idx);
        idx = str.indexOf('W', idx + 1);
    }
    // console.log(Ws)
    let k = Infinity;
    // let l = 0
    // let r = n-1
    // while(str[l]!=='W')
    //     l++
    // while(str[r]!=='W')
    //     r--
    m -= 1
    function dfs(m, l, r) {
        if (m == 0) {
            k = Math.min(k, Ws[r] - Ws[l] + 1)
            return
        }
        const mid = Math.floor((l + r) / 2)
        // let d = 0
        // while(str[mid+d]!=='W' && str[mid+d]!=='W')
        //     d++
        dfs(m - 1, l, mid)
        dfs(m - 1, mid, r)
    }
    dfs(m, 0, Ws.length - 1)
    // while(m){
    //     const mid = Math.floor((l+r)/2)
    //     let d = 0
    //     while(str[mid+d]!=='W')
    //     m--
    // }
    console.log(k)
}()
