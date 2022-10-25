// 稳定排序：插入排序，基数排序，归并排序，冒泡排序，计数排序。
// 不稳定的排序算法有：快速排序，希尔排序，简单选择排序，堆排序。

// console.log('插入排序');
function insertSort(arr){
  for(let i = 1;i<arr.length;i++){
    let key = arr[i]
    for(let j = i-1;j>=0;j--){
      if(key<arr[j]){ //往前移动
        arr[j+1] = arr[j]
        arr[j] = key
      }
    }
    console.log(arr);
  }
  return arr
}
// console.log(insertSort([2,1,12,3,4,5]));
// console.log(insertSort([2,12,12,3,2,5]));

function selectSort(arr){  
  for(let i = arr.length - 1;i > 0;i--){
    let max = arr[i];
      let maxIndex = i;
    for(let j = 0;j <= i;j++){
      if(max < arr[j]){
        max = arr[j]
        maxIndex = j
      }
    }
    arr[maxIndex] = arr[i]
    arr[i] = max;    
    console.log(arr);
  }
  return arr
}
// console.log(selectSort([2,1,12,3,4,5]));
// console.log(selectSort([2,12,12,3,2,5]));

function bubblingSort(arr){
  for(let i = arr.length - 1; i > 0; i--){
    for(let j = 1; j < arr.length; j++){
      if(arr[j]<arr[j-1]){
        [arr[j-1],arr[j]] = [arr[j],arr[j-1]]
      }
    }
    console.log(arr);
  }
  return arr
}
// console.log(bubblingSort([2,1,12,3,4,5]));
// console.log(bubblingSort([2,12,12,3,2,5]));

// function quickSort(arr){
//   let sort = (arr,left=1,right=arr.length-1)=>{
//     if(left>=right) return;
//   }
//   // 切分
//   let left = 0;
//   let right = arr.length-1;
//   while(left<right){

//   }
//   sort(arr,0,left);
// }

