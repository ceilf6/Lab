function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
async function main() { // 通过 async/await 同步来写异步sleep实现不同题之间区分
    
    console.log('T1')
    const promise1 = new Promise((resolve, reject) => {
        console.log('1')
        setTimeout(() => {
        resolve('success')
        }, 1000)
        console.log('2')
    })
    const promise2 = promise1.then(() => {
        throw new Error('error!!!')
    }).catch(err => {
        console.log('捕获到错误:', err.message)
    })

    console.log('promise1', promise1)
    console.log('promise2', promise2)

    await sleep(2000)
    console.log('promise1', promise1)
    console.log('promise2', promise2)

    // ========= T2 =========
    console.log('\nT2')
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log('once')
        resolve('success')
        }, 1000)
    })
    const start = Date.now()
    promise.then((res) => {
        console.log(res, Date.now() - start)
    })
    promise.then((res) => {
        console.log(res, Date.now() - start)
    })

    await sleep(1500)

    // ========= T3 =========
    console.log('\nT3')
    await Promise.resolve()
        .then(() => {
        return new Error('error!!!')
        })
        .then((res) => {
        console.log('then: ', res)
        throw new Error('error in then')
        })
        .catch((err) => {
        console.log('catch: ', err)
        })


    // ======
    console.log('\nT4')
    await Promise.resolve(1)
    .then((res) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve('new promise'), 2000)
      })
    })
    .then((res) => {
      console.log(res) // 2 秒后输出 new promise
    })

    // ========
    console.log('\nT5')
    await Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)

    // =========
    console.log('\nT6')
    await Promise.resolve()
    .then(function success (res) {
      throw new Error('error')
    }, function fail1 (e) {
      console.error('fail1: ', e)
    })
    .catch(function fail2 (e) {
      console.error('fail2: ', e)
    })
    console.log()
    await Promise.resolve()
  .then(function success1 (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .then(function success2 (res) {
  }, function fail2 (e) {
    console.error('fail2: ', e)
  })

  // ========
  console.log('\nT7')
  process.nextTick(() => {
    console.log('nextTick')
  })
  Promise.resolve()
    .then(() => {
      console.log('then')
    })
  setImmediate(() => {
    console.log('setImmediate')
  })
  console.log('end')


}
  











  main()




/*
console.log('T1')
const promise1 = new Promise((resolve, reject) => {
	console.log('1')
  setTimeout(() => {
    resolve('success')
  }, 1000)
  console.log('2')
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
}).catch(err => {
    console.log('捕获到错误:', err.message)
})
 
console.log('promise1', promise1)
console.log('promise2', promise2)
 
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

//======
console.log()
console.log('T2')
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('once')
      resolve('success')
    }, 1000)
  })
   
  const start = Date.now()
  promise.then((res) => {
    console.log(res, Date.now() - start)
  })
  promise.then((res) => {
    console.log(res, Date.now() - start)
  })

  //=====
console.log()
console.log('T3')
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
*/