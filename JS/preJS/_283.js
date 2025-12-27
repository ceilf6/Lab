var moveZeroes = function(nums) {
    let l=r=0;
    while(r<nums.length){
        if(nums[r]===0){
            r++;
        }
        else{
            if(l!==r){
                [nums[l],nums[r]]=[nums[r],nums[l]];
            }
            l++;
            r++;
        }
    }
    return nums;
};

nums = [0,1,0,3,12];
moveZeroes(nums);
console.log(nums); 