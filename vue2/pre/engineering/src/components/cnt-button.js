const CntButton = {
    // data 配置为函数就是为了复用组件时不同实例间的数据相互独立
    // 否则如果用同一个对象，数据就不会分割
    data() {
        return {
            count: this.cnt ? this.cnt : 0,
            // props 通过在 data函数中通过 this. 拿到
            // 或者直接在 template 中通过 {{ }}
            // Vue 在编译模板时自动做了 this 代理
        }
    },
    template: `<button @click="count++">点击了{{count}}次</button>`,
    props: ["cnt"]
}

export default CntButton
