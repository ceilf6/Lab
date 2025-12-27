class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
/*
class Tree {
    constructor(nums) {
        this.nums = nums;
    }

    build() {
        if (!this.nums.length) return null;
        const nodes = this.nums.map(v => v !== null ? new Node(v) : null);

        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i]) {
                if (2 * i + 1 < nodes.length) nodes[i].left = nodes[2 * i + 1];
                if (2 * i + 2 < nodes.length) nodes[i].right = nodes[2 * i + 2];
            }
        }

        return nodes[0];
    }
}
*/

class Tree {
    constructor(nums) {
        this.nums = nums;
    }

    build(index = 0) {
        // 分治终止条件
        if (index >= this.nums.length){ //|| this.nums[index] === null) {
            return null;
        }

        // 分：递归处理子问题
        const leftSubtree = this.build(2 * index + 1);
        const rightSubtree = this.build(2 * index + 2);

        // 治：合并子问题
        return new Node(this.nums[index], leftSubtree, rightSubtree);
    }
}

const tree = new Tree([1, 2, 3, null, 4, 5]);
const root = tree.build();

// 前序遍历：根 → 左 → 右
function preorder(root) {
    if (root === null) return;

    console.log(root.val); // 访问当前节点
    preorder(root.left);   // 遍历左子树
    preorder(root.right);  // 遍历右子树
}
preorder(root); // 输出: 1, 2, 4, 3, 5