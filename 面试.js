// 数组扁平化
// function flatten (arr) {
//   let res = []
//   if (!arr.length) return
//   // debugger
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       res = res.concat(flatten(arr[i]))
//     } else {
//       res.push(arr[i])
//     }
//   }
//   return res
// }

// let arr = [[1, 2, 3], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [1, 2, 13, [14]]]], 10]
// console.log(flatten(arr))

// 输出
// setTimeout(() => console.log('g'), 0)
// console.log('a')
// Promise.resolve().then(() => console.log('b')).then(() => console.log('c'))
// new Promise((resolve) => {
//   console.log('d')
//   resolve()
// }).then(() => {
//   console.log('e')
// }).then(() => { console.log('f') })
// a d b e c f g

// async function async1 () {
//   console.log(1)
//   const id = await async2()
//   console.log(2)
// }
// async function async2 () {
//   console.log(3)
//   await setTimeout(() => {
//     console.log('timer2')
//   }, 0)
//   console.log(4)
// }
// async1()
// console.log(5)
//  1 3 5 4 2

// 场景
// function fn () {
//   const date = new Date()
//   let time = localStorage.getItem('Time') || ''
//   const today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDay() + '23:59:59'
//   console.log(time * 1)
//   if (!time || date.getTime() > time) {
//     alert('第一次进入')
//     localStorage.setItem('Time', today)
//   }
// }
// fn()
// window.onscroll = throttle(function fn () {
//   console.log('object')
// })
// // 节流
// function throttle (fn, time = 1000) {
//   let timer = null
//   return function (...args) {
//     if (timer === null) {
//       fn.apply(this, args)
//       timer = setTimeout(() => {
//         timer = null
//       }, time)
//     }
//   }
// }

// 防抖
// function debounce (fn, time) {
//   let timer
//   return function (...args) {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, time)
//   }
// }
// document.addEventListener('input', debounce(function () {
//   console.log('123')
// }, 1000))
// 输出
// var b = 10;
// (function b () {
//   b = 20
//   console.log(this)//window
//   console.log(b)
// })()

// let n = 4
// let pArr = [2, 3, 4, 5]
// let wArr = [2, 5, 2, 4]
// // let res = 0
// let start = 1
// let max = Math.max(...pArr)
// function fn (start) {
//   debugger
//   let total = 0
//   if (start > max) return 0
//   let f = pArr.indexOf(start)
//   console.log(start, f, wArr[f], total)
//   if (f !== -1) {
//     total += wArr[f]
//     return wArr[f]
//   } else {
//     return 0
//   }
  
//   // return res
// }

// let res=0
// res += Math.max(fn(start * 2), fn(start * 2 + 1))
// // fn(1)
// console.log(res)