var threeSumClosest = function (nums, target) {
    nums.sort((a,b)=>a-b);
    let minDiff = Number.MAX_SAFE_INTEGER;
    let ans = 0;

    for(let i = 0; i < nums.length - 2; i++){
        // 跳过重复元素
        if(i > 0 && nums[i] === nums[i-1]) continue;
        
        // 优化：当前最小可能和 - 复用sum变量
        let sum = nums[i] + nums[i+1] + nums[i+2];
        if(sum > target){
            if(sum - target < minDiff){
                minDiff = sum - target;
                ans = sum;
            }
            break; // 后续不会有更小的差值
        }

        // 优化：当前最大可能和 - 复用sum变量
        sum = nums[i] + nums[nums.length-1] + nums[nums.length-2];
        if(sum < target){
            if(target - sum < minDiff){
                minDiff = target - sum;
                ans = sum;
            }
            continue; // 继续下一个i
        }

        // 双指针 - 复用sum变量
        for(let l = i + 1, r = nums.length - 1; l < r;){
            sum = nums[i] + nums[l] + nums[r];
            
            if(sum === target) return target;
            
            // 内联diff计算，不存储变量
            if(Math.abs(sum - target) < minDiff){
                minDiff = Math.abs(sum - target);
                ans = sum;
            }
            
            if(sum > target){
                r--;
                // 跳过重复元素优化
                while(l < r && nums[r] === nums[r + 1]) r--;
            } else {
                l++;
                // 跳过重复元素优化
                while(l < r && nums[l] === nums[l - 1]) l++;
            }
        }
    }
    return ans;
}