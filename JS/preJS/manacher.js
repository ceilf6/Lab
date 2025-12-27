function manacher(s) {
    // 在字符串中插入 '#'，消除奇偶长度的区分
    const t = '#' + s.split('').join('#') + '#';

    const n = t.length;
    const p = new Array(n).fill(0); // 回文半径数组
    let R = 0, C = 0, max_len = 0, center = 0;

    for (let i = 0; i < n; i++) {
        // 镜像位置的回文半径   且不能大于 R-i（罩不到了）
        p[i] = R > i ? Math.min(p[2 * C - i], R - i) : 0;

        // 暴力向两边拓展判断：如果相等那么就半径加一
        while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && t[i + p[i] + 1] === t[i - p[i] - 1]) {
            p[i]++;
        }

        // 更新最右端
        if (i + p[i] > R) {
            C = i;
            R = i + p[i];
        }

        // 记录最大半径
        if (p[i] > max_len) {
            max_len = p[i];
            center = i;
        }
    }

    // 提取原字符串中最长回文子串
    return s.slice((center - max_len) / 2, (center + max_len) / 2);
}

console.log(manacher('aba')); // 输出: "aba"