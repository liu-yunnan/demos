// 数据类型判断
function typeOf (obj) {
  //        [object object]     [object Array]  '[object', 'Array]'
  let res = Object.prototype.toString.call(obj).split(' ')[1]
  res = res.substring(0, res.length - 1)
  console.log(res)
}
typeOf([])