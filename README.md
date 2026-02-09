- [CSS/box/index.html](CSS/box/index.html)
    - macOS强制显示滚动条 [#2](https://github.com/ceilf6/Lab/issues/2)
    - 单行文本的省略空白处理 [#3](https://github.com/ceilf6/Lab/issues/3)

- [CSS/视觉格式化模型/常规文档流/外边距折叠.html](CSS/视觉格式化模型/常规文档流/外边距折叠.html)
    - 外边距折叠 [#4](https://github.com/ceilf6/Lab/issues/4)

- [CSS/视觉格式化模型/浮动/ex/css/common.css](CSS/视觉格式化模型/浮动/ex/css/common.css)
    - 分页器

- [CSS/视觉格式化模型/定位/二级菜单/css/2th.css](CSS/视觉格式化模型/定位/二级菜单/css/2th.css)
    - 32~ 元素的隐藏与显示，将 :hover 挂载到共同的父元素上
    - 79~ 二级菜单和上层之间衔接的 border 处理：伪元素遮挡

- [CSS/视觉格式化模型/定位/弹出层/css/popup.css](CSS/视觉格式化模型/定位/弹出层/css/popup.css)
    - 居中

- [HTML/表单元素/CSS美化/myRadio.css](HTML/表单元素/CSS美化/myRadio.css)
    - 自实现选择框

- [NodeJS/CMJ](NodeJS/CMJ)
    - .cjs 后缀会永远用 CJS
        - 会覆盖 package.json 中的 type: "module"
    - .mjs → 永远是 ES Module

- [Vue2/sandboxs](Vue2/sandboxs)
    - demo created from Vue/CLI

- [Vue2/sandboxs/src/utils/getComponentRootDom.js](Vue2/sandboxs/src/utils/getComponentRootDom.js)
    - 通过 render 以及 $el 获取某个组件渲染的Dom根元素

- [Vue2/sandboxs/src/utils/toast.js](Vue2/sandboxs/src/utils/toast.js)
    - 实现 toast 提示函数，通过 JS 创建提示框

- [Vue2/sandboxs/vue.config.js](Vue2/sandboxs/vue.config.js)
    - 通过开发服务器代理处理开发环境中的、浏览器同源策略导致的跨域问题

- [Vue2/sandboxs/src/mock/index.js](Vue2/sandboxs/src/mock/index.js)
    - 拦截 AJAX ，重新赋值 XHR 。 Apifox 和 Postman 也支持 mock 环境

- [Vue2/sandboxs/test/Lifecycle/timerDestroyed.vue](Vue2/sandboxs/test/Lifecycle/timerDestroyed.vue)
    - 类似于[组合关系](https://github.com/ceilf6/CPlusPlus/blob/main/docs/relationship_demo.cpp#L120)的析构函数，凡是在 mounted / created 中引入的“组件外部副作用”，都应该在 beforeDestroy 中对称清理
 
- [vue2沙盒开发的一系列成果测试脚本](https://github.com/ceilf6/Lab/blob/main/Vue2/sandboxs/package.json#L9)

- [Vue2/sandboxs/src/directives/loading/index.js](Vue2/sandboxs/src/directives/loading/index.js)
    - v-loading 自定义指令实现 Loading 态呈现

- [auto update Action for README](https://github.com/ceilf6/Lab/commit/e8a2c1df8e6f2bca5610dbd4a8dbbc40f8a8d268)

- [mixins 混入实现配置代码复用](https://github.com/ceilf6/Lab/commit/a2423747951f26fca4f3949f09b48b93cbc7b458)
- [组件递归 实现 层级列表组件 TreeListMenu](https://github.com/ceilf6/Lab/commit/64afdb48013cd41985b79fd8fa12c4d4ae249b81)
- [vue-router 动态路由匹配 通过 vue-router 注入的原型对象 $route 提供的路由信息](https://github.com/ceilf6/Lab/commit/833dd96a83e4f8a40d467202550db889c737236f)
- [React 自定义组件想要触发DOM事件，得传递到能响应的元素上 同时注意如果没有特殊处理，在事件处理函数中，this指向undefined 1. bind 2. () =>](https://github.com/ceilf6/Lab/commit/929c449923abc5d1e658b62b07571fa4e44ae267)
- [JS执行 - call stack 执行上下文中的 this 和 变量对象VO 虽然 ES6 后 const 和 let 不会污染对象，但是之前代码都用的 var 还是得了解](https://github.com/ceilf6/Lab/commit/7509501150c9e476648fb3f61d77ff26cb6a6799)
- [当找不到某个属性时，执行上下文通过函数对象的隐藏属性 \[\[Environment\]\] (之前叫 \[\[scope\]\] )指针连接外层词法环境形成作用域链，然后往上寻找 => 即使 outer 执行完了，inner 仍然保留对 outer 变量的引用、导致GC失败 => 闭包 \[ => 内存泄漏风险 \]](https://github.com/ceilf6/Lab/commit/1dae95e5ea6a478353708e30340e91fac2b7e13a)
- [CSRF danger example and 5 ways to solve](https://github.com/ceilf6/Lab/commit/3d687dd1827e287694ecd0bb5efbeef6265f0ef4)
- [如果setState改变状态的代码处于某个HTML元素的事件中，则其是异步的，否则是同步 如果要使用改变之后的状态，需要使用回调函数 如果新的状态要根据之前的状态链式作用，需要使用函数的方式改变状态 同时React会对异步的setState进行优化，将多次setState进行合并](https://github.com/ceilf6/Lab/commit/d04fd3df98317da48d47380ab49ae44c4e042669)
- [React 通过 props.children 实现 Vue 插槽功能 具名插槽区分 1. 直接传对象 2. 函数对象属性 3. 直接传递一个 render 函数 => ( JSX )](https://github.com/ceilf6/Lab/commit/d719805fda688bb389a31ff3db44e65f7ab81fb3)
- [默认情况下，Form 对在里面的所有的 Input 都传递了 handleChange, 当其中一个变化时，直接修改了 Form 的 state, 那么整个 Form 、 Form 中所有的 Input 都会 re-rende 通过 useForm 内部管理的 _formValues 实现字段级别订阅更新、 _formState 表单整体状态的观察者模式](https://github.com/ceilf6/Lab/commit/c856c39f9cbacee376616c6774c8e7fd567ba8f9)
- [以数组作为下标的影响: 数组变化后，相同位置的元素 key 相同，Vue 会认为是同一个元素，直接复用 DOM 但实际上数据已经变了，导致 DOM 和数据错位 特别是表单元素（input、select、textarea），它们的值存储在 DOM 节点上，不是响应式的，复用 DOM 后值就乱了，导致每次删除的都只可能是最后一个](https://github.com/ceilf6/Lab/commit/a566dac46f44788660fcb7c369be272d59b10401)
- [a 被 B 引用了，形成了闭包，B函数携带了 a 创建时的词法环境，所以其存储于堆内存中、不被回收（如果在栈内存上会导致需要引用的时候已经出栈了）；b 没有被引用，只会在 A 的执行上下文中、短暂的存在栈内存中，在 A 执行结束后变得不可达](https://github.com/ceilf6/Lab/commit/55cf74ffe5e2468376021b0b6efddcc878ec721e)
- [父组件异步处理后返回子组件 1. emit 中回调函数，类似于 React 中父组件传递给子组件处理函数、提供权力子组件影响父组件的数据 2. 父组件返回Promise，子组件通过 .$listeners 拿到父组件的 handle 函数引用（但是 listener 是直接调用的函数，没有触发事件的上报） 3. 父组件直接 props 传下去处理函数，处理函数和 2 一样都是返回的 Promise](https://github.com/ceilf6/Lab/commit/cc063d8d86a63c6b6397662e2c9bff8ff68c770b)
- [v-model + event-modifiers v-model 默认是 input 事件，在事件修饰符之后 v-model.lazy 是change 事件 开启 .number 修饰自动将事件value转为数字](https://github.com/ceilf6/Lab/commit/761e9c704e8650a982d33e17bab0fbaf6fe02fb6)
- [手动实现观察者模式 => 事件总线 方便组件之间通信、组件和普通模块通信、事件处理 ( Vue 自带 $emit, $on, $off 实例成员，直接导出一个 Vue 实例都可以 )](https://github.com/ceilf6/Lab/commit/965fd30b27e265aa759d8ba2e9794c18114213c9)
- [利用浏览器资源缓存，实现 v-lazy 自定义懒加载图片指令 其中滚轮视图事件通过事件总线管理，抽离出mixin统一上抛事件](https://github.com/ceilf6/Lab/commit/2e70841c9483f1119901e7f9fd9a8093b7517310)
