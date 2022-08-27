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
  // 遍历原数组，若arr中含有数组则使用一次扩展运算符，直至没有为止。
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

// 浅拷贝
function shallowCopy (obj) {
  if (typeof obj !== 'object') return obj
  let newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
// 测试用例
let copyObj3 = shallowCopy(obj)
// console.log('浅拷贝', copyObj3 === obj)

// 类数组转数组
const arrayLike = { 1: 'a', 4: 'd', length: 9 }
// 可迭代对象使用使用扩展符
// 不可迭代对象使用 Array.prototype.slice.call() 和 Array.from()
// let array = [...arrayLike] 
// let array = Array.from(arrayLike)
// let array = Array.prototype.slice.call(arrayLike)
// console.log(array)

// 实现数组原型方法
// forEach
let sum = 0
// arr.forEach(function (item) {
//   sum += item
// })

Array.prototype.forEach1 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or no defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not function')
  }
  // debugger
  // this当前传入的数组
  let O = new Object(this)
  // 意义：为了保证转换后的值为正整数。
  const len = O.length >>> 0
  let k = 0
  for (let k = 0; k < len; k++) {
    if (k in O) {
      // value,index,array
      callback.call(thisArg, O[k], k, O)
    }
  }
}
arr.forEach1(function (item) {
  sum += item
})
console.log('forEach', sum)

// map 
Array.prototype.map1 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or no defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not function')
  }
  const o = new Object(this)
  let len = o.length >>> 0
  let newArr = []
  for (let k = 0; k < len; k++) {
    if (k in o) {
      newArr[k] = callback.call(thisArg, o[k], k, o)
    }
  }
  return newArr
}

let arrMap = arr.map1((item) => item * 2)
console.log('map', arrMap)

// filter
Array.prototype.filter1 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or no defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not function')
  }
  const o = new Object(this)
  let len = o.length >>> 0
  let newArr = []
  for (let k = 0; k < len; k++) {
    if (callback.call(thisArg, o[k], k, o)) {
      newArr.push(o[k])
    }
  }
  return newArr
}
let arrFilter = arr.filter1((item) => item < 5)
console.log('filter', arrFilter)

// some
Array.prototype.filter1 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or no defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not function')
  }
  const o = new Object(this)
  let len = o.length >>> 0
  let newArr = []
  for (let k = 0; k < len; k++) {
    if (callback.call(thisArg, o[k], k, o)) {
      return true
    }
  }
  return false
}
let arrSome = arr.some((item) => item > 5)
console.log('some', arrSome)

// reduce
Array.prototype.reduce1 = function (callback, initialvalue) {
  if (this == null) {
    throw new TypeError('this is null or no defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not function')
  }
  const o = new Object(this)
  let len = o.length >>> 0
  let k = 0
  let accumulator = initialvalue
  // 如果初始值为undefined，则需要在数组中找数组的第一个有效值
  // debugger
  if (accumulator === undefined) {
    while (k < len && !(k in o)) {
      k++
    }
    if (k >= len) {
      // 没有初始值的空数组
      throw new TypeError('Reduce of empty array with no initial value')
    }
    // 将第一个有效值给到初始值
    accumulator = o[k++]
  }
  while (k < len) {
    if (k in o) {
      accumulator = callback(accumulator, o[k], k, o)
    }
    k++
  }
  return accumulator
}

let numbers = [15.5, 2.3, 1.1, 4.7]

function getSum (total, num) {
  return total + Math.round(num)
}
console.log('reduce', numbers.reduce1(getSum))

// call
Function.prototype.call1 = function (context, ...args) {
  // debugger
  // console.log(context)
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function')
  }
  context = context || window
  let fn = Symbol('fn')
  context[fn] = this
  // console.log(context[fn])
  let res = context[fn](...args)
  delete context[fn]
  return res
}

// apply
Function.prototype.apply1 = function (context, arr) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function')
  }
  context = context || window
  let fn = Symbol('fn')
  context[fn] = this
  let res = context[fn](...arr)
  delete context[fn]
  return res
}

// bind
Function.prototype.bind1 = function (context, ...args) {
  // debugger
  let that = this  // 保存原函数（this）
  if (typeof that !== "function") {
    throw new TypeError("this is not function")
  }
  return function F (...innerArgs) {
    // 判断是否是 new 构造函数
    // 由于这里是调用的 call 方法，因此不需要判断 context 是否为空
    return that.call(context, ...args, ...innerArgs)
    // return that.call(this instanceof F ? this : context, ...args, ...innerArgs)
  }
}

// 测试
function add (a, b) {
  // console.log(this);
  return a + b + this.c
}
window.c = 10
const objTest = {
  c: 20
}
console.log('call', add.call1(undefined, 30, 40)) // 指向window 结果80
console.log('call', add.call1(objTest, 30, 40)) // 指向obj 结果90
console.log('apply', add.apply1(undefined, [30, 40])) // 指向window 结果80
console.log('apply', add.apply1(objTest, [30, 40])) // 指向obj 结果90
let fn1 = add.bind1(objTest, 30, 40)
console.log('bind', fn1())