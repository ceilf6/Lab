Function.prototype.myBind = function(thisArg, ...args) {
  const self = this; // 原始函数
  function boundFn(...innerArgs) {
    // 判断是否用 new 调用
    if (this instanceof boundFn) {
      // new > 显式：this 是新创建的实例对象 → 不绑定 thisArg，而是让原函数自己绑定 this
      return new self(...args, ...innerArgs);
    } else {
      // 正常调用 → 强绑定 thisArg
      return self.apply(thisArg, [...args, ...innerArgs]);
    }
  }

  // 原型链绑定：新函数继承原函数
  boundFn.prototype = Object.create(self.prototype);

  return boundFn;
}