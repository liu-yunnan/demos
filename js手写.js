// 数据类型判断
function typeOf (obj) {
  //        [object object]     [object Array]  '[object', 'Array]'
  // let res = Object.prototype.toString.call(obj).split(' ')[1]
  // res = res.substring(0, res.length - 1).toLowerCase()
  //                            [object Array]  Array
  let res = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  console.log(res)

}
// 测试用例
typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'

// 数组去重
// es5
function unique (arr) {
  let res = arr.filter(function (item, index, array) {
    // console.log(array.indexOf(item) === index)
    // indexOf获取到的是第一个item的位置
    return array.indexOf(item) === index
  })
  return res
}
//es6
let unique1 = arr => [...new Set(arr)]

// 测试用例
let arr = [1, 2, 3, 4, 5, 1, 2, 3, 6]
// console.log(unique(arr))
console.log('数组去重', unique1(arr))
// console.log(new Set(arr))//{1,2,3,4,5,6}

// 数组扁平化
// 将多层数组拍平成一层
// console.log([1, 2, [3, [4]]].flat(2))
// es5
function flatten (arr) {
  let result = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
// es6
function flatten1 (arr) {
  // some 不改变原数组
  // 不对空数组进行访问
  // 有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 测试用例
console.log('数组扁平化es5', flatten([1, 2, [3, [4]]]))
console.log('数组扁平化es6', flatten1([1, 2, [3, [4]]]))

//  深拷贝
function deepClone (obj) {
  if (typeof obj !== 'object') return
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    // 检测属性是否为对象的自有属性
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}
// plus版
function deepClonePlus (obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj //原始值
  if (obj instanceof Date) return new Date(obj) //日期值
  if (obj instanceof RegExp) return new RegExp(obj) //正则
  // 判断是否循环引用，若已存在 要将已深拷贝的该值直接返回
  if (cache.has(obj)) return cache.get(obj) //防止循环引用情况
  let copyObj = new obj.constructor() //创建一个和obj类型一样的对象
  console.log(copyObj)
  cache.set(obj, copyObj) //放入缓存中
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copyObj[key] = deepClonePlus(obj[key], cache)
    }
  }
  return copyObj
}


const obj = {
  name: 'Jack',
  address: {
    x: 100,
    y: 200
  },
  hibbit: ['唱歌', '画画', '健身']
}
let copyObj = JSON.parse(JSON.stringify(obj))
console.log('json深拷贝', copyObj === obj)
let copyObj1 = deepClone(obj)
console.log('简易版深拷贝', copyObj1 === obj)
let copyObj2 = deepClonePlus(obj)
console.log('plus深拷贝', copyObj2 === obj)