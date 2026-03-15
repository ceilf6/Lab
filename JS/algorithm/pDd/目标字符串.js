// 多多君最近在研究字符串之间的变换，可以对字符串进行若干次变换操作:

// 交换任意两个相邻的字符，代价为0。
// 将任意一个字符a修改成字符b，代价为 |a - b|（绝对值）。
// 现在有两个长度相同的字符串X和Y，多多君想知道，如果要将X和Y变成两个一样的字符串，需要的最少的代价之和是多少。

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 任意交换，那么只需要贪心就好：让距离最近的两个做减法
// 本来想着通过 sum1 - sum2 ，但是注意 "ad" 和 "bc" 的答案并不是0，所以还是得通过排序后让最近的做减法

void async function () {
    const n = await readline()
    const from = await readline()
    const to = await readline()
    // function dfs(step){
    // }
    let nums1 = []
    let nums2 = []
    for (let i = 0; i < n; i++) {
        // ans+=Math.abs(from.charCodeAt(i)-to.charCodeAt(i))
        nums1.push(from.charCodeAt(i))
        nums2.push(to.charCodeAt(i))
    }
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)
    let ans = 0
    for (let i = 0; i < n; i++)
        ans += Math.abs(nums1[i] - nums2[i])
    console.log(ans)
}()
