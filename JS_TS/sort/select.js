export default function selectionSort(arr) {
  const LA = arr.length;

  // 分为无序 和 有序 部分
  for (let i = 0; i < LA - 1; i++) { // 当前未排序开头、最后一个无需再比较
    let minID = i;
    for (let j = i + 1; j < LA; j++) {
      if (arr[j] < arr[minID]) { // 改成 <
        minID = j;
      }
    }
    if (minID !== i) [arr[i], arr[minID]] = [arr[minID], arr[i]];
  }

  return arr;
}