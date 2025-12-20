class MyIterator {
  constructor(params) {
    this.index = 0;
    this.value = params;
  }
  [Symbol.iterator]() {
    return this; // 可迭代协议
  }
  next() { // 迭代器协议
    return {
      value: this.value[this.index++],
      done: this.index > this.value.length ? true : false,
    };
  }
}