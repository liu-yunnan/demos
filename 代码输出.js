var resolveAfter2Seconds = function () {
  console.log("starting slow promise")
  return new Promise(resolve => {
    setTimeout(function () {
      resolve("slow")
      console.log("slow promise is done")
    }, 2000)
  })
}

var resolveAfter1Second = function () {
  console.log("starting fast promise")
  return new Promise(resolve => {
    setTimeout(function () {
      resolve("fast")
      console.log("fast promise is done")
    }, 1000)
  })
}

var sequentialStart = async function () {
  console.log('==SEQUENTIAL START==')
  // 1. Execution gets here almost instantly
  // 如果 await 操作符后的表达式不是一个 Promise 对象, 则它会被转换成一个 resolved 状态的 Promise 对象
  const slow = await resolveAfter2Seconds()
  console.log(slow) // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second()
  console.log(fast) // 3. this runs 3 seconds after 1.
}

var concurrentStart = async function () {
  console.log('==CONCURRENT START with await==')
  // 两个计时器被同时创建
  const slow = resolveAfter2Seconds() // starts timer immediately
  const fast = resolveAfter1Second() // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow) // 2. this runs 2 seconds after 1.
  console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

var concurrentPromise = function () {
  console.log('==CONCURRENT START with Promise.all==')
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
    console.log(messages[0]) // slow
    console.log(messages[1]) // fast
  })
}

var parallel = async function () {
  console.log('==PARALLEL with await Promise.all==')

  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))()
  ])
}

// This function does not handle errors. See warning below!
var parallelPromise = function () {
  console.log('==PARALLEL with Promise.then==')
  resolveAfter2Seconds().then((message) => console.log(message))
  resolveAfter1Second().then((message) => console.log(message))
}
/**
 * ==SEQUENTIAL START== 代码输出.js:22:11
  starting slow promise 代码输出.js:2:11
  Live reload enabled. index.html:179:13
  slow promise is done 代码输出.js:6:15
  slow 代码输出.js:25:11
  starting fast promise 代码输出.js:12:11
  fast promise is done 代码输出.js:16:15
  fast
 */
sequentialStart() // after 2 seconds, logs "slow", then after 1 more second, "fast"

/**
 * ==CONCURRENT START with await== 
  starting slow promise 
  starting fast promise
  fast promise is done
  slow promise is done
  slow
  fast
 */
// wait above to finish
setTimeout(concurrentStart, 4000) // after 2 seconds, logs "slow" and then "fast"
/**
 * ==CONCURRENT START with Promise.all== 代码输出.js:42:11
  starting slow promise 代码输出.js:2:11
  starting fast promise 代码输出.js:12:11
  fast promise is done 代码输出.js:16:15
  slow promise is done 代码输出.js:6:15
  slow 代码输出.js:44:13
  fast
 */
// wait again
setTimeout(concurrentPromise, 7000) // same as concurrentStart
/**
 * ==PARALLEL with await Promise.all== 代码输出.js:50:11
  starting slow promise 代码输出.js:2:11
  starting fast promise 代码输出.js:12:11
  fast promise is done 代码输出.js:16:15
  fast 代码输出.js:55:26
  slow promise is done 代码输出.js:6:15
  slow 代码输出.js:54:26
 */
// wait again
setTimeout(parallel, 10000) // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"
/**
 * ==PARALLEL with Promise.then== 代码输出.js:61:11
  starting slow promise 代码输出.js:2:11
  starting fast promise 代码输出.js:12:11
  fast promise is done 代码输出.js:16:15
  fast 代码输出.js:63:51
  slow promise is done 代码输出.js:6:15
  slow
 */
// wait again
setTimeout(parallelPromise, 13000) // same as parallel
