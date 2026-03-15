// 多多君拼团购买了N个骰子，为了方便后面进行活动，多多君需要将这些骰子进行分类。
// 两个骰子为同类的定义是：
// 将其中一个骰子通过若干次上下、左右或前后翻转后，其与另一个骰子对应的6面数字均相等。
// 现在多多君想知道不同种类的骰子的数量分别有多少。

const rl = require("readline").createInterface({ input: process.stdin });
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 总共有三条轴可以旋转
// 总共 24 种可能
// 在选择完顶面后（6种），顶和底固定了仍然可以绕上下轴旋转选择前面，总共4种
// 6*4 = 24
function rotX(a) {
    // 绕左右轴旋转：上 前 下 后
    const [u, d, l, r, f, b] = a;
    return [b, f, l, r, u, d];
}

function rotY(a) {
    // 绕前后轴旋转：上 左 下 右
    const [u, d, l, r, f, b] = a;
    return [r, l, u, d, f, b];
}

function rotZ(a) {
    // 绕上下轴旋转：前 右 后 左
    const [u, d, l, r, f, b] = a;
    return [u, d, f, b, r, l];
}

function canonical(arr) {
    const seen = new Set();
    const q = [arr];
    let best = null;

    while (q.length) {
        const cur = q.pop();
        const key = cur.join(",");
        if (seen.has(key)) continue;
        seen.add(key);

        if (best === null || key < best) best = key;
        // 取最小的作为hash

        q.push(rotX(cur));
        q.push(rotY(cur));
        q.push(rotZ(cur));
    }

    return best;
}

void async function () {
    const N = Number(await readline());
    const mp = new Map();

    for (let i = 0; i < N; i++) {
        const arr = (await readline()).trim().split(/\s+/).map(Number);
        const key = canonical(arr);
        mp.set(key, (mp.get(key) || 0) + 1);
    }

    const ans = Array.from(mp.values()).sort((a, b) => b - a);
    console.log(ans.length);
    console.log(ans.join(" "));
}();



// 2/20 只考虑了对面，这取巧了，这道题还是得像上面枚举状态后取最小的作为hash
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const N = Number(await readline());
    // const nums = []
    const vis = new Map()
    for (let I = 0; I < N; I++) {
        const num = (await readline()).split(' ').map(item => { return Number(item) })
        const tempMap = new Array(6)
        const mins = []
        for (let i = 0; i < 6; i += 2) {
            // 确保一对小的在前
            if (num[i] > num[i + 1]) {
                const temp = num[i + 1]
                num[i + 1] = num[i]
                num[i] = temp
            }
            tempMap[num[i] - 1] = num[i + 1] // 一对中 小 => 大
            mins.push(num[i])
        }
        mins.sort((a, b) => a - b)
        let cur = ''
        for (const x of mins) {
            cur = cur + x + tempMap[x - 1]
            // cur += x + tempMap[] 的话右边先做运算就没有字符串+数字了，而是直接两个数字相加
        }
        vis.set(cur, (vis.get(cur) || 0) + 1)
    }
    const valsArr = Array.from(vis.values()).sort((a, b) => b - a)
    console.log(valsArr.length)
    // for(const val of valsArr)
    console.log(valsArr.join(' '))
}()
