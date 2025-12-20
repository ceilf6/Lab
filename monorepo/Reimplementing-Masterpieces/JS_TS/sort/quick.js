export default function quickSort(arr,left=0,right=arr.length-1) {
  if(left >= right) return arr;
  let lt = left;
  let gt = right;
  let pivot = arr[left];
  let i = left+1;
  while(i <= gt){
    if(arr[i]<pivot){
      [arr[lt],arr[i]]=[arr[i],arr[lt]];
      lt++;
      i++;
    }else if(arr[i]>pivot){
      [arr[i],arr[gt]]=[arr[gt],arr[i]];
      gt--;
    }else{
      i++;
    }
  }

  quickSort(arr,left,lt-1); // 分治
  quickSort(arr,gt+1,right);

  return arr;
}