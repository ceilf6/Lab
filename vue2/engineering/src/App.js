// Vue 的根组件
import CntButton from './components/cnt-button'

const template = `
<h1> I\'m ceilf6 </h1>
<CntButton />
`

// 组件的本质就是一个配置对象
export default {
    components: {
        CntButton
    },
    template
}