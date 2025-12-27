var findmid=function(nums1,nums2){
    if (nums1.lenght>nums2.length){
        [nuam1,num2]=[nums2,nums1];
    }

    let l1=nums1.length,l2=nums2.length;
    let ileft=0,right=l1,halfl=Math.floor((l1+l2+1)/2);
    while (ileft<right){
        let i=Math.floor((ileft+right)/2);
        let j=halfl-i;
        if (i<m && nums1[i]<nums2[j-1]){
            ileft=i+1;
        }else if(i>0 && nums1[i-1]>nums2[j]){
            right=i-1;
        }else{
            let maxleft=0;
            if (i===0) maxleft=nums2[j-1];
            else if (j===0) maxleft=nums1[i-1];
            else maxleft=Math.max(nums1[i-1],nums2[j-1]);
            
            if ((l1+l2)%2===0){
                let minright=0;
                if (i===l1) minright=nums2[j];
                else if (j===l2) minright=nums1[i];
                else minright=Math.min(nums1[i],nums2[j]);
                return (maxleft+minright)/2;
            }else{
                return maxleft;
            }
        }
    }
    return 0; // This line should never be reached if inputs are valid
}