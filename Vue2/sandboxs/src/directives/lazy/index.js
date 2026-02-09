import eventBus from "@/eventBus";
import debounce from "../../utils/debounce";
import defaultImg from '@/assets/defaultImg.gif'

let imgs = [];

function setImage(img) {
    img.dom.src = defaultImg // 设置默认图片（浏览器会缓存，能极大提高性能）

    // 懒加载图片处理
    // 判断图片是否在视口范围内
    const rect = img.dom.getBoundingClientRect();
    const height = rect.height || 150; // 当图片没有加载时高度是 0 
    const clientHeight = document.documentElement.clientHeight
    if (rect.top >= -height && rect.top <= clientHeight) {
        // 在视口范围内
        const newImg = new Image()
        // 等图片加载完之后再进行替换掉默认图片
        newImg.onload = () => img.dom.src = img.src
        newImg.src = img.src // 开始加载

        // img.flag = true // 移除图片
        imgs = imgs.filter(i => i !== img)
    }
}
// 随着滚动条滚动，显示视口中的、需要显示的图片
function handleScroll() {
    for (const img of imgs) {
        setImage(img)
    }
}

// 作为滚动事件的监听者加入到事件总线中（因为只有滚轮才会移动视图）
// 注意 mixins/mainScroll 上抛的事件名称是 mainScroll
eventBus.$on("mainScroll", debounce(handleScroll, 30))

export default {
    // 得是 inserted 加到父元素中去之后，否则像 bind 绑定时候就调用的话，无法拿到视口信息
    inserted(el, bindings) {
        const nowImg = ({
            src: bindings.value,
            dom: el,
            // flag: false, // 标记是否已经处理过 // 当前最新方案直接移除
        })
        imgs.push(nowImg) // 在使用指令的时候，说明该图片需要纳入懒加载图片范围
        setImage(nowImg) // 当绑定指令时需要立即处理
    },
    unbind(el) {
        imgs = imgs.filter(img => img.dom != el) // 当 el 卸载时需要析构对应资源
    }
}