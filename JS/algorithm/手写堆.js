// https://www.nowcoder.com/practice/f5c52183dfb148489321f881239216c1
// https://github.com/ceilf6/dataStructure/blob/main/learn2code/6-%E6%A0%91/%E4%BA%8C%E5%8F%89%E6%A0%91/%E5%A0%86/%E6%9C%80%E5%B0%8F%E5%A0%86.cpp

// @datastructures-js/priority-queue

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const [n, m] = (await readline()).split(' ').map(it => Number(it))
    const heap = (await readline()).split(' ').map(it => Number(it))
    const ups = (await readline()).split(' ').map(it => Number(it))
    function Down(i) {
        while (true) { // 不断往下
            const lIdx = 2 * i + 1
            const rIdx = 2 * i + 2
            let curSmall = heap[i]
            const l = lIdx < n ? heap[lIdx] : null
            const r = rIdx < n ? heap[rIdx] : null
            let smallIdx
            if (l !== null && l < curSmall) {
                smallIdx = 2 * i + 1
                curSmall = heap[smallIdx]
            }
            if (r !== null && r < curSmall) {
                smallIdx = 2 * i + 2
            }
            if (!smallIdx) // 无需交换、无需再往下
                break
            [heap[i], heap[smallIdx]] = [heap[smallIdx], heap[i]]
            if (smallIdx === lIdx)
                i = lIdx
            else if (smallIdx === rIdx)
                i = rIdx
        }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        Down(i) // 建堆
    }
    function Pop() {
        const head = heap[0]
        heap[0] = heap[heap.length - 1] // 出堆时将最后一个提到头然后往下调整
        // heap.splice(heap.length-1,1)
        heap.pop()
        Down(0)
        return head
    }
    function Up(i) {
        while (true) { // 向上调整也需要不断往上
            if (i <= 0)
                break
            const fatherIdx = Math.floor((i - 1) / 2)
            const father = heap[fatherIdx]
            if (father > heap[i]) {
                [heap[i], heap[fatherIdx]] = [father, heap[i]]
                i = fatherIdx
            } else {
                break // 没有交换就无需再往上调整
            }
        }
    }
    function Push(newVal) {
        heap.push(newVal)
        Up(heap.length - 1)
    }
    let maxNum = Math.max(...heap)
    for (const up of ups) {
        const head = Pop()
        const newVal = head + up
        if (newVal > maxNum) // 最大值只可能受新来的威胁
            maxNum = newVal
        Push(newVal)
        // console.log(Math.max(...heap))
        console.log(maxNum)
    }
}()

/**
 * 
import heapq

n, m = map(int, input().split())
heap = list(map(int, input().split()))
ups = list(map(int, input().split()))

# 建堆（原地 O(n)）
heapq.heapify(heap)

# 维护当前最大值
max_val = max(heap)

for up in ups:
    # 取最小值
    smallest = heapq.heappop(heap)

    new_val = smallest + up

    # 放回堆
    heapq.heappush(heap, new_val)

    # 更新最大值
    if new_val > max_val:
        max_val = new_val

    print(max_val)
 */