class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === 'pending') {
        // 问题：没有处理 value 是 Promise 的情况
        if (value && typeof value.then === 'function') {
          // 如果 value 是 thenable，应该等待其状态
          value.then(resolve, reject);
          return;
        }
        this.status = 'fulfilled';
        this.value = value;
        queueMicrotask(() => {
          this.onFulfilledCallbacks.forEach(fn => fn(value));
        });
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        queueMicrotask(() => {
          this.onRejectedCallbacks.forEach(fn => fn(reason));
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // 默认处理函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e; };

    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          const result = onFulfilled(value);
          // 修复：需要检查 result 是否为 Promise 或 thenable
          if (result && typeof result.then === 'function') {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = (reason) => {
        try {
          const result = onRejected(reason);
          // 修复：同样需要检查 result 是否为 Promise 或 thenable
          if (result && typeof result.then === 'function') {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.status === 'fulfilled') {
        queueMicrotask(() => handleFulfilled(this.value));
      } else if (this.status === 'rejected') {
        queueMicrotask(() => handleRejected(this.reason));
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(cb) {
    return this.then(
      val => MyPromise.resolve(cb()).then(() => val),
      err => MyPromise.resolve(cb()).then(() => { throw err; })
    );
  }

  // 静态 resolve 和 reject
  static resolve(value) {
    // 问题：没有检查 value 是否已经是 Promise
    if (value instanceof MyPromise) {
      return value;
    }
    // 问题：没有处理 thenable 对象
    if (value && typeof value.then === 'function') {
      return new MyPromise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}