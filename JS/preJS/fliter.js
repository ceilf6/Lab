const nums1=[2,2,3,4,4,5];

const nums2=nums1.filter((item,index)=> nums1.indexOf(item)===index);

const nums3=[...new Set(nums1)];

console.log(nums2); // 输出: [2, 3, 4, 5]