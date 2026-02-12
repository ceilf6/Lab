export default function HTMLModelElement() {
    Object.defineProperty(this, "innerHTML", {
        get() {
            // 获取UI页面中元素内容
        },
        set(val) {
            // 更新元素
            // 触发重新渲染
        }
    })
}