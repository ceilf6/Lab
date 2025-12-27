//分治，不同就消
var majorityElement = function(nums) {
    function pinsha(nums,l,r){
        if (l==r-1){    //边界条件
            if(nums[l]!=nums[r]){
                return []
            }else{
                return [nums[l]];//nums.slice(l,r);
            }
        }
        if(l==r){
            return [nums[l]];
        }

        let mid=Math.floor((l+r)/2)
        return pinsha(nums,l,mid).concat(pinsha(nums,mid+1,r));
    }

    while(nums.length>1){
        nums=pinsha(nums,0,nums.length-1);
        console.log(nums);
    }


    return parseInt(nums[0]);
}

nums=[3,2,3];
console.log(majorityElement(nums)); //输出3