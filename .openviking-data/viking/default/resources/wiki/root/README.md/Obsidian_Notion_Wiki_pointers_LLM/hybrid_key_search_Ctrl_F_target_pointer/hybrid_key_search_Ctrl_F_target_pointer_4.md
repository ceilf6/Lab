- [Vue3 异步加载组件](https://github.com/ceilf6/Wiki/commit/26d8f16016337bb123efb9c240652efad093c913)
- [通过配置 defineAsyncComponent 对象设置 loading 和 error, Vue3 的 util syncGetComp 比 Vue2的 多等待和错误状态 Vue3 h函数具名了，方便随时创建虚拟节点](https://github.com/ceilf6/Wiki/commit/dc5f60bd3314dbeda794008915c6928807f1eafb)
- [异步加载页面（本质就是异步加载组件）](https://github.com/ceilf6/Wiki/commit/af1bc8ac862a196a3be1a9f4eba292de4d8e1407)
- [朦层 通过 Teleport 修改在真实DOM中的位置](https://github.com/ceilf6/Wiki/commit/24c3744fa6b8b997c80c9d9f527349242ca34a77)
- [property-descriptor 属性描述符对象 设置 set/get => 存取器属性“Invoke property getter”: 不再是在内存中管理 obj.a ，而是类似于 直接运行get()和set(val) 预检 通过innerText => UI和数据双向绑定](https://github.com/ceilf6/Wiki/commit/4bbf99a0344b1c1bdbe93e597895211b0d719cc7)
- [ES6 => Reflect => 函数式编程、JS底层能力API](https://github.com/ceilf6/Wiki/commit/19d0ecd467ecac47565c7aa47c0990b6cab7a9d7)
- [可以通过 proxy 在 Reflect 的底层实现基础上做想做的](https://github.com/ceilf6/Wiki/commit/030ed37fc99142ab4e611f3ad3523df2daa3514a)
- [通过 Object.defineProperty 实现浅层观察者模式 设置了两个对象，无法时时刻刻保证两个对象一致性（所以 vue2 有 $set 和 $delete 用于在 mounted 之后的属性更改）](https://github.com/ceilf6/Wiki/commit/588438566d7879136ed778924e109578576da21f)
- [递归实现深层观察者模式](https://github.com/ceilf6/Wiki/commit/5ee0c12a0109eb9b2a6e0c764225a539d0dc2c38)
- [虽然 defineProperty 可以直接通过覆盖 target 来避免 ob 的创建，但是会导致污染原先对象 最佳实践还是 Proxy](https://github.com/ceilf6/Wiki/commit/89778f849e4ef2d1ddeba52822634cb8b3fd72d2)
- [类代理，自动进行任何构造函数属性赋值](https://github.com/ceilf6/Wiki/commit/22108b52f6a73efab0d37f9af977134c23a9fd2a)
- [通过代理校验实现类似TS的JS](https://github.com/ceilf6/Wiki/commit/891e300778eecdbd87b4b8661e80e8f4837f3834)

- [#7](https://github.com/ceilf6/Wiki/discussions/7)
    - reactive ⇒ proxy实例
    - readonly ⇒ 返回了新的 proxy 实例，set 和 deleteProperty 做了特殊处理
    - ref 可以代理任何数据类型，封装到一个对象 value 属性上
        1. 原始数据类型 ⇒ ES6的 get value() 和 set value() 本质就是 Object.defineProperty 存取器属性
对象用 Proxy 是为了动态的无感监听，但是原始数据类型直接用一个 对象 包裹后只需要管理一个属性 value 即可，不需要动态代理所有属性
        2. 对象 ⇒ 使用 reactive
        3. proxy实例 ⇒ 直接用该代理
    - computed 在监听对象改变后第一次会触发计算函数，后面都是用的缓存
    [link](https://github.com/ceilf6/Wiki/commit/1c6f732a7cb6face6f9ba700979f17bc68bf5188)