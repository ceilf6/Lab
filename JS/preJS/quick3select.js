function quickSort3Way(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    let lt = left;         // 小于区域的右边界
    let gt = right;        // 大于区域的左边界
    let pivot = arr[left]; // 选取第一个元素为基准
    let i = left + 1;

    while (i <= gt) {
        if (arr[i] < pivot) {
            [arr[lt], arr[i]] = [arr[i], arr[lt]];
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            i++;
        }
    }

    quickSort3Way(arr, left, lt - 1);
    quickSort3Way(arr, gt + 1, right);
}

// 示例：
let nums = [3, 5, 2, 3, 1, 3, 4, 2, 3];
quickSort3Way(nums);
console.log(nums);