class SegmentTreeLazy {
    constructor(nums) {
        this.n = nums.length;
        this.tree = new Array(this.n * 4).fill(0);
        this.lazy = new Array(this.n * 4).fill(0);
        this.build(nums, 0, 0, this.n - 1);
    }

    build(nums, node, l, r) {
        if (l === r) {
            this.tree[node] = nums[l];
        } else {
            const mid = Math.floor((l + r) / 2);
                         //二分分治
            this.build(nums, node * 2 + 1, l, mid);
            this.build(nums, node * 2 + 2, mid + 1, r);
            this.tree[node] = this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
        }                                           //归并
    }

    pushDown(node, l, r) {
        if (this.lazy[node] !== 0) {
            const mid = Math.floor((l + r) / 2);
            const left = node * 2 + 1, right = node * 2 + 2;
            this.tree[left] += this.lazy[node] * (mid - l + 1);
            this.tree[right] += this.lazy[node] * (r - mid);
            this.lazy[left] += this.lazy[node];
            this.lazy[right] += this.lazy[node];
            this.lazy[node] = 0;
        }
    }

    updateRange(qL, qR, val, node = 0, l = 0, r = this.n - 1) {
        if (qR < l || qL > r) return;

        if (qL <= l && r <= qR) {
            this.tree[node] += val * (r - l + 1);
            this.lazy[node] += val;
            return;
        }

        this.pushDown(node, l, r);
        const mid = Math.floor((l + r) / 2);
        this.updateRange(qL, qR, val, node * 2 + 1, l, mid);
        this.updateRange(qL, qR, val, node * 2 + 2, mid + 1, r);
        this.tree[node] = this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
    }

    queryRange(qL, qR, node = 0, l = 0, r = this.n - 1) {
        if (qR < l || qL > r) return 0;

        if (qL <= l && r <= qR) return this.tree[node];

        this.pushDown(node, l, r);
        const mid = Math.floor((l + r) / 2);
        const leftSum = this.queryRange(qL, qR, node * 2 + 1, l, mid);
        const rightSum = this.queryRange(qL, qR, node * 2 + 2, mid + 1, r);
        return leftSum + rightSum;
    }
}