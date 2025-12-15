多产物 + 组件分包目录 + 顶层聚合导出 + 每组件自带样式副作用

# 顶层目录（产物形态）

- es/ : ESM产物（对打包工具Vite/Webpack做tree-shaking友好），module指向index.js，types指向./es/index.d.ts
- cjs/ : CommonJS产物，main指向index.js
- umd/ 和 bundle/ : 面向直接引入 / 整包的产物，style.css 是全量样式合并版，`bundle/antd-mobile.es.js` 等是“全量 JS 合并版”

# 组件如何被管理

## 目录

在 es/componennts/ 下，每个组件一个文件夹：button/ , toast/

每个文件夹以 index.js 作为入口

1. import 将该组件样式作为副作用引入
2. export default 导出组件本体

例如 index.js：先引入 button.css，再 export default Button

复杂组件会在入口做“属性挂载/静态方法”组织：例如 ActionSheet 入口通过 attachPropertiesToComponent 把 show 作为静态方法挂到组件上；Toast 则导出一个对象 { show, clear, config }

## 导出

- 顶层入口 index.js 是“聚合导出表”：一行一个组件 `export { default as Button } from './components/button'` 这种形式
- 同时顶层会 `import './global'`：这会触发 index.js，它引入 `global.css` 并做一些全局行为（例如绑定 `touchstart` 以保证 `:active` 生效）

# 样式、按需与tree-shaking的关键点

- **按需样式**：因为每个组件入口 index.js 都会 `import "./<component>.css"`，所以当你只引入 Button，通常就只会把 button.css（以及它依赖到的全局部分）打进最终产物
- **全量样式**：如果你想“一次性全引入”，通常使用 style.css（里面是所有组件样式 + CSS 变量等的合并结果）
- **`sideEffects` 配置**（在 package.json）：声明 `*/*.css`、`*/*.less` 等为副作用文件，避免被打包器在 tree-shaking 时误删；同时把 index.js、index.js 等也标成 sideEffects（因为顶层有 `import './global'` 这种需要保留的副作用）