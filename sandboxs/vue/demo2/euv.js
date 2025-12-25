/**
 * 观察某个对象的所有属性
 * @param {Object} obj
 */
function observe(obj) {
  for (const key in obj) { // var的话有闭包问题
    let internalValue = obj[key];
    // const funcs = [];
    const funcs = new Set()
    Object.defineProperty(obj, key, {
      get: function () {
        //  依赖收集，记录：是哪个函数在用我
        // if (window.__func && !funcs.includes(window.__func)) { // 单例
        //   funcs.push(window.__func);
        // }
        funcs.add(window.__func);
        return internalValue;
      },
      set: function (val) {
        internalValue = val;
        // 派发更新，运行：执行用我的函数 - 调用观察者的回调函数
        for (var i = 0; i < funcs.length; i++) {
          funcs[i]();
        }
      },
    });
  }
}

function autorun(fn) {
  window.__func = fn; // 
  fn();
  window.__func = null;
}
