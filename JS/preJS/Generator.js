function* gen() {
  const a1 = yield 'a1';
  console.log('a1 :', a1);
  const a2 = yield 'a2';
  console.log('a2 :', a2);
  return 'done';
}

const iter = gen(); // 第一次调用，返回一个迭代器 iter

console.log(iter.next());       // → { value: 'a1', done: false }
console.log(iter.next('nxt2'));  // → { value: 'a2', done: false }，    a1 : nxt2
console.log(iter.next('nxt3'));  // → { value: 'done', done: true }    a2 : nxt3