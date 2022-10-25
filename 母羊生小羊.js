function getSheep(year){
  let arr = [1,0,0,0]//第一年为1只
  for(let i = 1; i <= year; i++){
    for(let j = 3;j>0;j--){
      arr[j] = arr[j-1]
    }
    arr[0] = arr[1]+arr[3]
  }
  return arr[0]+arr[1]+arr[2]+arr[3]
}
console.log(getSheep(10));