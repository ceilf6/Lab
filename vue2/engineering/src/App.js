// Vue 的根组件
import CntButton from './components/cnt-button.js'

const template = `
<div>
  <h1> I\'m ceilf6 </h1>
  <cnt-button></cnt-button>
`
// 在 Vue2 的 in‑DOM 模板里需要用 kebab-case，而且不要自闭合

// 组件的本质就是一个配置对象
export default {
    components: {
        CntButton
    },
    template
}
