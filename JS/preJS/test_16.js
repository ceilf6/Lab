// 加载16.js中的函数
const fs = require('fs');
const code = fs.readFileSync('./16.js', 'utf8');
eval(code);

// 测试用例
function test() {
    console.log('测试 threeSumClosest 函数：');
    
    // 测试用例1
    let nums1 = [-1, 2, 1, -4];
    let target1 = 1;
    let result1 = threeSumClosest(nums1, target1);
    console.log(`测试1: nums = [${nums1}], target = ${target1}`);
    console.log(`结果: ${result1}, 期望: 2`);
    console.log(`正确: ${result1 === 2}\n`);
    
    // 测试用例2
    let nums2 = [0, 0, 0];
    let target2 = 1;
    let result2 = threeSumClosest(nums2, target2);
    console.log(`测试2: nums = [${nums2}], target = ${target2}`);
    console.log(`结果: ${result2}, 期望: 0`);
    console.log(`正确: ${result2 === 0}\n`);
    
    // 测试用例3 - 有重复元素
    let nums3 = [1, 1, 1, 0];
    let target3 = -100;
    let result3 = threeSumClosest(nums3, target3);
    console.log(`测试3: nums = [${nums3}], target = ${target3}`);
    console.log(`结果: ${result3}, 期望: 2`);
    console.log(`正确: ${result3 === 2}\n`);
    
    // 测试用例4 - 大数组性能测试
    let nums4 = [];
    for(let i = 0; i < 1000; i++) {
        nums4.push(Math.floor(Math.random() * 2000) - 1000);
    }
    let target4 = 0;
    
    console.time('性能测试');
    let result4 = threeSumClosest(nums4, target4);
    console.timeEnd('性能测试');
    console.log(`大数组测试完成，结果: ${result4}\n`);
}

test();
