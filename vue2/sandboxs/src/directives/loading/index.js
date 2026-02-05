import loadingUrl from '@/assets/loading.svg'
import styles from "./loading.module.less";

// 导出指令的配置对象

// export default 
// {
//     bind(el, binding) {
//         // 创建 img 元素，放到 el 元素内部
//     },
//     update() {
//         // 数据更新决定是否显示
//     }
// }
// 
// 简化配置，可以直接写一个函数配入到 bind 和 update
export default function (el, binding) {
    // 根据 binding.value 值决定 Loading 元素的创建和删除
    const curImg = getLoadingImg(el);
    if (binding.value) {
        if (!curImg) {
            const img = createLoadingImg()
            el.appendChild(img)
        }
    } else {
        curImg.remove();
    }
}

function getLoadingImg(el) {
    return el.querySelector("img[data-role=loading]")
}

function createLoadingImg() {
    const img = document.createElement("img")
    img.dataset.role = "loading"
    img.src = loadingUrl
    img.className = styles.loading;
    return img;
}