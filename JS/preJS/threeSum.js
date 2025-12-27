/**
 * 三数之和问题的正确解决方案
 * 给定一个整数数组 nums，返回所有和为 0 且不重复的三元组
 * 
 * 算法思路：
 * 1. 首先对数组进行排序
 * 2. 固定第一个数，用双指针寻找另外两个数
 * 3. 通过跳过重复元素来避免重复的三元组
 */

var threeSum = function(nums) {
    // 如果数组长度小于3，直接返回空数组
    if (nums.length < 3) return [];
    
    // 排序是关键步骤
    nums.sort((a, b) => a - b);
    const result = [];
    
    // 固定第一个数
    for (let i = 0; i < nums.length - 2; i++) {
        // 跳过重复的第一个数（去重优化）
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        // 如果第一个数大于0，后面都是正数，不可能和为0
        if (nums[i] > 0) break;
        
        // 双指针寻找另外两个数
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                // 找到一个解
                result.push([nums[i], nums[left], nums[right]]);
                
                // 跳过重复的第二个数
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                // 跳过重复的第三个数
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                
                // 移动指针继续寻找
                left++;
                right--;
            } else if (sum < 0) {
                // 和太小，左指针右移
                left++;
            } else {
                // 和太大，右指针左移
                right--;
            }
        }
    }
    
    return result;
};

// 测试用例
console.log('测试用例1:');
console.log('输入: [-1,0,1,2,-1,-4]');
console.log('输出:', threeSum([-1,0,1,2,-1,-4]));
console.log('期望: [[-1,-1,2],[-1,0,1]]');

console.log('\n测试用例2:');
console.log('输入: [0,1,1]');
console.log('输出:', threeSum([0,1,1]));
console.log('期望: []');

console.log('\n测试用例3:');
console.log('输入: [0,0,0]');
console.log('输出:', threeSum([0,0,0]));
console.log('期望: [[0,0,0]]');

console.log('\n测试用例4:');
console.log('输入: [-2,0,1,1,2]');
console.log('输出:', threeSum([-2,0,1,1,2]));
console.log('期望: [[-2,0,2],[-2,1,1]]');

// 时间复杂度分析
console.log('\n算法复杂度分析:');
console.log('时间复杂度: O(n²) - 外层循环O(n)，内层双指针O(n)');
console.log('空间复杂度: O(1) - 不考虑结果数组的额外空间');

// 优化版本：加入早期终止条件
var threeSumOptimized = function(nums) {
    if (nums.length < 3) return [];
    
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // 跳过重复元素
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        // 早期终止：如果当前数字大于0，后面都是正数
        if (nums[i] > 0) break;
        
        // 早期终止：如果当前数字和最后两个数字的和小于0，当前数字太小
        if (nums[i] + nums[nums.length - 1] + nums[nums.length - 2] < 0) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // 跳过重复元素
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
};

console.log('\n优化版本测试:');
console.log('输入: [-1,0,1,2,-1,-4]');
console.log('输出:', threeSumOptimized([-1,0,1,2,-1,-4]));
