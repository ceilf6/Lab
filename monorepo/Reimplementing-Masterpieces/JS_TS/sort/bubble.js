export default function bubbleSort(arr) {
  const LA = arr.length ;

  for(let i = 0; i<LA ;i++){
    for(let j = i+1; j<LA ;j++){
      if(arr[i] > arr[j]){
        [arr[i],arr[j]] = [arr[j],arr[i]]
      }
    }
  }
  
  return arr
}