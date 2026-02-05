// 导出指令的配置对象

export default {
    bind(el, binding) {
        console.log("=== bind")
        console.log(el, binding)
    },
    inserted() {
        console.log("=== inserted")
    },
    update() {
        console.log("=== update")
    }
}