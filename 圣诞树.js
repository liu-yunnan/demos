function fn(height){
  let res = ''
  for(let i = 0;i<height;i++){
    let stars = '*'.repeat(2*i+1)
    let spaces = ' '.repeat(height - i -1)
    res += spaces + stars +spaces
    if(i!==height-1){
      res+='\n'
    }
  }
 return res
}
// console.log(fn(5));

function fn1(height){
  let res =''
  for(let i = 0;i<height;i++){
    let spaces = ' '.repeat(height - i -1)
    let stars = '*'.repeat(2 * i + 1)
    res += spaces + stars +spaces+'\n'
    
  }
  for(let i = height - 2;i>=0;i--){
    let spaces = ' '.repeat(height - i -1)
    let stars = '*'.repeat(2 * i + 1)
    res += spaces + stars +spaces
    if(i!==0){
      res+='\n'
    }
  }
  return res
}
console.log(fn1(5));