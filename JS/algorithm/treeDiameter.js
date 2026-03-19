// https://www.nowcoder.com/practice/8aeda31a5b524b31a2fcdfb62341aed6

// 两次BFS/DFS 求树的直径
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const nums = (await readline()).split(' ').map(it => Number(it))
    const strMax = nums.reduce((obj, it) => {
        obj.s += Math.floor(it / 2) * 2
        if (!obj.flag && it % 2 == 1) {
            obj.s += 1
            obj.flag = 1
        }
        return obj
    }, { s: 0, flag: 0 })

    const n = Number(await readline()) // 别忘记 Number
    const next = Array.from({ length: n }, () => new Array())
    for (let i = 0; i < n - 1; i++) {
        const [from, to] = (await readline()).split(' ').map(it => Number(it))
        next[from - 1].push(to - 1)
        next[to - 1].push(from - 1)
    }

    // 两次BFS
    let queue = []
    let head = 0
    let vis = new Array(n).fill(0)
    let farNode;
    let maxD = -Infinity;
    function BFS(i) {
        vis[i] = 1
        queue.push([i, 0])
        while (head < queue.length) {
            // shift 会整体移动数组性能过差
            const [cur, curD] = queue[head]
            head++
            // const [cur,curD] = queue.shift()
            let flag = 0 // 是否能往下走，即是否到头了
            for (const nxt of next[cur]) {
                if (!vis[nxt]) {
                    vis[nxt] = 1
                    queue.push([nxt, curD + 1])
                    flag = 1
                }
            }
            if (!flag && maxD < curD) {
                // 注意一定要比较得到是最远的
                farNode = cur
                maxD = curD
            }
        }
    }
    BFS(0)
    // 刷新
    // queue = []
    vis = new Array(n).fill(0)
    BFS(farNode)
    maxD += 1 // 注意别忘记算入当前节点的长度1

    // // 两次DFS
    let far2;
    let maxD2 = -Infinity
    function dfs(cur, curD) {
        for (const x of next[cur])
            if (!vis2[x]) {
                vis2[x] = 1
                dfs(x, curD + 1)
                vis2[x] = 0 // 恢复现场
            }

        if (curD > maxD2) { // 需要最远的
            far2 = cur
            maxD2 = curD
        }
    }
    const vis2 = new Array(n).fill(0)
    vis2[0] = 1
    dfs(0, 0)
    vis2[0] = 0
    vis2[far2] = 1
    dfs(far2, 0)

    maxD2 += 1 // 注意别忘记算入当前节点的长度1
    console.log(maxD === maxD2)
    console.log(Math.min(maxD, strMax.s))
}()




// Floyd 空间复杂度O(n**2)超限
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const nums = (await readline()).split(' ').map(it => Number(it))
    const strMax = nums.reduce((obj, it) => {
        obj.s += Math.floor(it / 2) * 2
        if (!obj.flag && it % 2 == 1) {
            obj.s += 1
            obj.flag = 1
        }
        return obj
    }, { s: 0, flag: 0 })
    // console.log(strMax)

    const n = Number(await readline()) // 别忘记 Number
    const d = Array.from({ length: n }, () => new Array(n).fill(Infinity))
    for (let i = 0; i < n - 1; i++) {
        const [from, to] = (await readline()).split(' ').map(it => Number(it))
        d[from - 1][to - 1] = 1
        d[to - 1][from - 1] = 1
    }
    for (let i = 0; i < n; i++)
        d[i][i] = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                if (d[i][k] !== Infinity && d[k][j] !== Infinity) {
                    const curD = d[i][k] + d[k][j]
                    d[i][j] = Math.min(curD, d[i][j])
                    d[j][i] = Math.min(curD, d[j][i])
                }
            }
        }
    }
    // console.log(d)
    let dMax = 0
    for (const arr of d) {
        for (const it of arr) {
            // console.log(it)
            if (it !== Infinity)
                dMax = Math.max(dMax, it)
        }
    }
    // console.log(dMax)
    dMax += 1 // 别忘记算入起点自身的长度
    console.log(Math.min(strMax.s, dMax))

    // const Nodes = new Array(n+1)
    // class Node {
    //     constructor(){
    //         this.next = null
    //     }
    // }
    // for(let i=0;i<n-1;i++){
    //     const [from,to] = (await readline()).split(' ').map(it => Number(it))
    //     const fromNode
    //     const toNode
    //     if(Nodes[from])
    //         fromNode = Nodes[from]
    //     else
    //         fromNode = new Node()
    //     if(Nodes[to])
    //         toNode = Nodes[to]
    //     else
    //         toNode = new Node()

    // }
}()

// DFS 时间复杂度O(n**2)
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const nums = (await readline()).split(' ').map(it => Number(it))
    const strMax = nums.reduce((obj, it) => {
        obj.s += Math.floor(it / 2) * 2
        if (!obj.flag && it % 2 == 1) {
            obj.s += 1
            obj.flag = 1
        }
        return obj
    }, { s: 0, flag: 0 })
    // console.log(strMax)

    const n = Number(await readline()) // 别忘记 Number
    // const d = Array.from({length: n},() => new Array(n).fill(Infinity))
    const next = Array.from({ length: n }, () => new Array())
    for (let i = 0; i < n - 1; i++) {
        const [from, to] = (await readline()).split(' ').map(it => Number(it))
        next[from - 1].push(to - 1)
        next[to - 1].push(from - 1)
    }
    // for(let i=0;i<n;i++)
    //     d[i][i]=0
    // for(let i=0;i<n;i++){
    //     for(let j=0;j<n;j++){
    //         for(let k=0;k<n;k++){
    //             if(d[i][k]!==Infinity && d[k][j]!==Infinity){
    //                 const curD = d[i][k]+d[k][j]
    //                 d[i][j] = Math.min(curD,d[i][j])
    //                 d[j][i] = Math.min(curD,d[j][i])
    //             }
    //         }
    //     }
    // }
    // console.log(d)
    let dMax = 0
    // console.log(next)
    function dfs(cur, curD) {
        dMax = Math.max(dMax, curD)
        // console.log(vis)
        // if(!next[cur].length){
        //     dMax = Math.max(curD,dMax)
        //     return
        // }
        // let flag = 0
        for (const x of next[cur])
            if (!vis[x]) {
                vis[x] = 1
                dfs(x, curD + 1)
                vis[x] = 0 // 恢复现场
            }
    }
    const vis = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        vis[i] = 1
        dfs(i, 0)
        vis[i] = 0
    }
    // for(const arr of d){
    //     for(const it of arr){
    //         // console.log(it)
    //         if(it!==Infinity)
    //             dMax = Math.max(dMax,it)
    //     }
    // }
    // console.log(dMax)
    dMax += 1 // 别忘记算入起点自身的长度
    console.log(Math.min(strMax.s, dMax))

    // const Nodes = new Array(n+1)
    // class Node {
    //     constructor(){
    //         this.next = null
    //     }
    // }
    // for(let i=0;i<n-1;i++){
    //     const [from,to] = (await readline()).split(' ').map(it => Number(it))
    //     const fromNode
    //     const toNode
    //     if(Nodes[from])
    //         fromNode = Nodes[from]
    //     else
    //         fromNode = new Node()
    //     if(Nodes[to])
    //         toNode = Nodes[to]
    //     else
    //         toNode = new Node()

    // }
}()
