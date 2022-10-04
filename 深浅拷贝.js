// 深拷贝
let obj = {
  a: 1,
  b: {
    c: 2,
    d: null
  },
  d: [1, 2, 34, 5],
  e: function fn () { }
}

function deepClone (obj) {
  // 判断是否为对象
  if (typeof obj !== 'object' || obj === null) return obj
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    // 判断是否为自身属性
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}
console.log('deepClone', deepClone(obj))


// plus版
let objP = {
  a: new Date(),
  b: {
    c: 2,
    d: null
  },
  d: [1, 2, 34, 5],
  e: function fn () { },
  // f: new RegExp('/d+', 'g')
}
// console.log(deepClone(objP))
function deepClonePlus (obj, cache = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (cache.has(obj)) return cache.get(obj)
  // let newObj = new obj.constructor()
  let newObj = obj instanceof Array ? [] : {}
  cache.set(obj, newObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj = typeof obj[key] === 'object' ? deepClonePlus(obj[key], cache) : obj
    }
  }
  return newObj
}
console.log('deepClonePlus', deepClonePlus(objP))

console.log('API版', JSON.parse(JSON.stringify(obj)))
// 不能序列化函数
// 会忽略undefined
// 不能解决循环引用

