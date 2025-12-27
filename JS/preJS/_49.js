// 原始代码（有一些可以优化的地方）
var groupAnagrams = function(strs) {
    const seen = new Map();
    for (let str of strs) {
        let arrstr = Array.from(str);
        arrstr.sort();
        arrstr = JSON.stringify(arrstr);  // 不需要JSON.stringify

        if (!seen.has(arrstr)) {
            seen.set(arrstr, [str]);
        } else {
            seen.get(arrstr).push(str);
        }
    }
    let ans = Array();  // 应该是 new Array() 或 []
    for (let kv of seen) {
        ans.push(kv[1]);
    }
    return ans;
};

// 优化版本1：直接使用排序后的字符串作为key
var groupAnagramsOptimized1 = function(strs) {
    const map = new Map();
    
    for (let str of strs) {
        // 直接排序字符串，不需要转数组再JSON.stringify
        const key = str.split('').sort().join('');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
};

// 优化版本2：使用字符计数作为key（更高效）
var groupAnagramsOptimized2 = function(strs) {
    const map = new Map();
    
    for (let str of strs) {
        // 使用字符计数数组作为key，避免排序
        const count = new Array(26).fill(0);
        for (let char of str) {
            count[char.charCodeAt(0) - 97]++; // 'a'.charCodeAt(0) = 97
        }
        const key = count.join(',');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
};

// 优化版本3：使用对象而非Map（在某些情况下更快）
var groupAnagramsOptimized3 = function(strs) {
    const groups = {};
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(str);
    }
    
    return Object.values(groups);
};

// 优化版本4：函数式编程风格
var groupAnagramsOptimized4 = function(strs) {
    const getKey = str => str.split('').sort().join('');
    
    return Object.values(
        strs.reduce((groups, str) => {
            const key = getKey(str);
            groups[key] = groups[key] || [];
            groups[key].push(str);
            return groups;
        }, {})
    );
};

// 测试用例
const testCases = [
    ["eat", "tea", "tan", "ate", "nat", "bat"],
    [""],
    ["a"],
    ["abc", "bca", "cab", "xyz", "zyx", "yxz"],
    ["abab", "baba", "abba", "baab"]
];

console.log('=== 字母异位词分组测试 ===\n');

testCases.forEach((testCase, index) => {
    console.log(`测试用例${index + 1}: [${testCase.map(s => `"${s}"`).join(', ')}]`);
    
    console.log('原始版本:', JSON.stringify(groupAnagrams(testCase)));
    console.log('优化版本1:', JSON.stringify(groupAnagramsOptimized1(testCase)));
    console.log('优化版本2:', JSON.stringify(groupAnagramsOptimized2(testCase)));
    console.log('优化版本3:', JSON.stringify(groupAnagramsOptimized3(testCase)));
    console.log('优化版本4:', JSON.stringify(groupAnagramsOptimized4(testCase)));
    console.log('');
});

// 性能测试
function performanceTest() {
    console.log('=== 性能测试 ===');
    
    // 生成大量测试数据
    const generateTestData = (size) => {
        const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat', 'tab', 'abc', 'bca', 'cab'];
        const result = [];
        for (let i = 0; i < size; i++) {
            result.push(words[Math.floor(Math.random() * words.length)]);
        }
        return result;
    };
    
    const largeTestData = generateTestData(10000);
    
    const testFunction = (fn, name) => {
        const start = performance.now();
        fn(largeTestData);
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    };
    
    testFunction(groupAnagrams, '原始版本');
    testFunction(groupAnagramsOptimized1, '优化版本1(排序)');
    testFunction(groupAnagramsOptimized2, '优化版本2(计数)');
    testFunction(groupAnagramsOptimized3, '优化版本3(对象)');
    testFunction(groupAnagramsOptimized4, '优化版本4(函数式)');
}

performanceTest();

// 复杂度分析
console.log('\n=== 复杂度分析 ===');
console.log('原始版本:');
console.log('  时间复杂度: O(n * k * log k) - n个字符串，每个长度k，排序需要k*log k');
console.log('  空间复杂度: O(n * k) - 存储所有字符串');

console.log('\n优化版本1(直接排序):');
console.log('  时间复杂度: O(n * k * log k)');
console.log('  空间复杂度: O(n * k)');
console.log('  优势: 代码简洁，减少了JSON序列化开销');

console.log('\n优化版本2(字符计数):');
console.log('  时间复杂度: O(n * k) - 避免了排序');
console.log('  空间复杂度: O(n * k)');
console.log('  优势: 最优时间复杂度，适合字符集固定的场景');

console.log('\n优化版本3(使用对象):');
console.log('  时间复杂度: O(n * k * log k)');
console.log('  空间复杂度: O(n * k)');
console.log('  优势: 在某些JavaScript引擎中对象访问比Map更快');

console.log('\n优化版本4(函数式):');
console.log('  时间复杂度: O(n * k * log k)');
console.log('  空间复杂度: O(n * k)');
console.log('  优势: 代码简洁，函数式风格');