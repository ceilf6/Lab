import { useState, useEffect, useCallback } from 'react';

// 观察者模式
class Source {
  constructor(initialValue) {
    this._value = initialValue;
    this.subscribers = new Set() // 观察者回调函数集合
  }

  // get 和 set 是类的属性访问器关键词
  // 访问器拿到观察者
  get value() {
    return this._value;
  }

  // 设置器通知观察者
  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this.notifySubscribers();
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
    // 返回一个清理观察者回调函数的函数，用于管理订阅
  }

  // 通知所有订阅者
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this._value));
  }
}

// 观察
function useSource(source) {
  const [value, setValue] = useState(source.value);

  /* 
  useCallback 用于缓存函数引用的钩子，避免在每次组件重新渲染的时候都创建新的函数实例
  1. 能够防止 props 传入的函数导致的无效刷新子组件
  2. 能提高函数作为 useEffect 依赖的稳定性
  */

  // 稳定的回调函数，避免不必要的重订阅
  const handleValueChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  // 订阅source的变化 - 只在source实例变化时才会重新订阅
  // 由于我们通常不会替换source实例，这个effect只会执行一次
  useEffect(() => {
    const unsubscribe = source.subscribe(handleValueChange); // subscribe 返回的是取消订阅函数
    return unsubscribe; // useEffect return 返回给React作为清理函数，组件卸载时取消订阅
  }, [source, handleValueChange]);

  return value;
}

export { Source, useSource };

const source = new Source(1); // 在组件外部创建，确保全局状态单实例

export default function HomePage() {
  const value = useSource(source);
  console.log('render', source)
  setTimeout(() => {
    source.value = 1 + source.value; // Change the value of the Source object every second
  }, 1000);
  return (
    <div>
      <button onClick={() => { source.value = source.value + 1 }}>{value}</button>
      <UserButton />
      Home Page
    </div>
  )
}