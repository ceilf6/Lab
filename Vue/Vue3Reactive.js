/* 为什么要用 Reflect
统一为函数式写法，符合面向对象
报错不会中断，而是返回 false（比如只读的时候）
通过 receiver 参数可以指定 this上下文
*/

const bucket = new WeakMap(); // 用于依赖收集

function Vue3Reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key); // 收集依赖
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); // 触发更新
      return result;
    }
  });
}

// 收集依赖函数
function track(target, key) {
  if (!activeEffect) return; // 如果没有激活的 effect，直接返回
  let depsMap = bucket.get(target); // 获取 target 的依赖映射
  if (!depsMap) bucket.set(target, (depsMap = new Map()));
  let deps = depsMap.get(key); // 获取 key 的依赖集合
  if (!deps) depsMap.set(key, (deps = new Set())); 
  deps.add(activeEffect); // 将当前激活的 effect 添加到依赖集合
}

// 触发更新函数
function trigger(target, key) {
  const depsMap = bucket.get(target); // 获取 target 的依赖映射
  if (!depsMap) return; // 如果没有依赖，直接返回
  const deps = depsMap.get(key); // 获取 key 的依赖集合
  if (deps) deps.forEach(fn => fn()); // 遍历依赖集合，执行每个依赖的函数
}


// 示例
let activeEffect;
function effect(fn) {
  activeEffect = fn;
  fn(); // 立即执行一次
  activeEffect = null;
}

const state = Vue3Reactive({ count: 0 });

effect(() => {
  console.log('count is:', state.count); // 依赖收集
});

state.count++; // 触发更新