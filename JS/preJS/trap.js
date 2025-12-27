/**
 * 接雨水问题 - 用户的原始代码（有问题的版本）
 */
var trap = function(height) {
    const h=new Map();
    let hi=1;
    const len=height.length
    while (true){
        for(let i=0;i<len;i++){
            if (height[i]>=hi){
                h.set(hi,[i]);
                break;
            }
        }
        if (!h.has(hi)) break;
        for(let i=len;i>h.get(hi)[0];i--){
            if (height[i]>=hi){
                h.get(hi).push(i);
                break;
            }
        }
        if (h.get(hi).length<2) break;
    }
    //前面已经统计完两臂高
    let yuji;
    const shiji=Math.sum(height);
    for(item of h){
        if (h.get(item).length===2){
            yuji+=h.get(item)[1]-h.get(item)[0];
        }
    }
    return yuji-shiji;
};

// 测试用例
console.log("用户原始代码测试:");
try {
    console.log("输入: [0,1,0,2,1,0,1,3,2,1,2,1]");
    console.log("输出:", trap([0,1,0,2,1,0,1,3,2,1,2,1]));
    console.log("期望: 6");
} catch (error) {
    console.log("错误:", error.message);
}

/**
 * 分析用户代码的主要问题：
 * 1. Math.sum() 不存在，应该用 reduce() 或其他方法计算数组和
 * 2. yuji 变量未初始化就使用
 * 3. 算法逻辑复杂且有缺陷
 * 4. for...of 循环中的变量使用错误
 * 5. hi++ 缺失，会导致无限循环
 */

/**
 * 正确的接雨水解决方案 - 双指针法
 */
var trapCorrect = function(height) {
    if (height.length < 3) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            // 处理左侧
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            // 处理右侧
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
};

/**
 * 动态规划解法（更容易理解）
 */
var trapDP = function(height) {
    const n = height.length;
    if (n < 3) return 0;
    
    // 计算每个位置左侧的最大高度
    const leftMax = new Array(n);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    
    // 计算每个位置右侧的最大高度
    const rightMax = new Array(n);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }
    
    // 计算每个位置能接的雨水
    let water = 0;
    for (let i = 0; i < n; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        if (waterLevel > height[i]) {
            water += waterLevel - height[i];
        }
    }
    
    return water;
};

/**
 * 单调栈解法
 */
var trapStack = function(height) {
    const stack = [];
    let water = 0;
    
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            
            if (stack.length === 0) break;
            
            const distance = i - stack[stack.length - 1] - 1;
            const boundedHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
            water += distance * boundedHeight;
        }
        stack.push(i);
    }
    
    return water;
};

// 测试所有解法
console.log("\n正确解法测试:");

const testCases = [
    [0,1,0,2,1,0,1,3,2,1,2,1], // 期望: 6
    [4,2,0,3,2,5],              // 期望: 9
    [3,0,2,0,4],                // 期望: 7
    [0,1,0],                    // 期望: 0
    [1],                        // 期望: 0
    [1,2,1]                     // 期望: 0
];

const expectedResults = [6, 9, 7, 0, 0, 0];

testCases.forEach((testCase, index) => {
    console.log(`\n测试用例 ${index + 1}: [${testCase.join(',')}]`);
    console.log(`双指针法: ${trapCorrect(testCase)}`);
    console.log(`动态规划: ${trapDP(testCase)}`);
    console.log(`单调栈法: ${trapStack(testCase)}`);
    console.log(`期望结果: ${expectedResults[index]}`);
});

console.log("\n算法复杂度分析:");
console.log("双指针法 - 时间: O(n), 空间: O(1)");
console.log("动态规划 - 时间: O(n), 空间: O(n)");
console.log("单调栈法 - 时间: O(n), 空间: O(n)");

/**
 * 修正用户代码的主要问题
 */
var trapFixed = function(height) {
    const h = new Map();
    let hi = 1;
    const len = height.length;
    
    while (true) {
        // 找左边界
        for (let i = 0; i < len; i++) {
            if (height[i] >= hi) {
                h.set(hi, [i]);
                break;
            }
        }
        if (!h.has(hi)) break;
        
        // 找右边界
        for (let i = len - 1; i > h.get(hi)[0]; i--) { // 修正: i从len-1开始
            if (height[i] >= hi) {
                h.get(hi).push(i);
                break;
            }
        }
        if (h.get(hi).length < 2) break;
        
        hi++; // 修正: 添加缺失的递增
    }
    
    // 计算雨水
    let yuji = 0; // 修正: 初始化
    const shiji = height.reduce((sum, h) => sum + h, 0); // 修正: 使用reduce计算和
    
    for (let [level, positions] of h) { // 修正: 正确的for...of语法
        if (positions.length === 2) {
            yuji += (positions[1] - positions[0] + 1) * level; // 修正: 计算面积
        }
    }
    
    return yuji - shiji;
};

console.log("\n修正后的用户代码测试:");
testCases.forEach((testCase, index) => {
    console.log(`测试用例 ${index + 1}: [${testCase.join(',')}] -> ${trapFixed(testCase)} (期望: ${expectedResults[index]})`);
});
