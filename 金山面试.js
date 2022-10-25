function intersection(...arr){
  // console.log(arr);
  let res = arr.reduce((a,b)=>{
    // console.log(a);
    return a.filter(item => b.includes(item))
  })
  return [...new Set(res)]
}
console.log(intersection([1,2,3],[1,2],[2,2,4]));
console.log(intersection([1,2,3],[2,2,4]));
console.log(intersection([2,2,2],[2,2],[2,2,2]));


function reduce(arr,fn,n){
  let total = arguments.length === 3 ? n : 0;
  for(let i = 0; i < arr.length; i++){
    total = fn(total, arr[i])
  }
  return total
}
console.log(reduce([1,2,3,4,5,6,7,8,9,10],(x,y)=>x+y,100));
console.log(reduce([1,2,3,4,5,6,7,8,9,10],(x,y)=>x+y));
console.log(reduce([1,2,3,4,5,6,7,8,9,10],(x,y)=>x+y,undefined));// NaN