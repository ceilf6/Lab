import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon"
import styles from '@/styles/toast.module.less'

/**
 * 弹出消息提示
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info / error / success / warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中：如果不传默认在页面中间
 */
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;

    // 创建消息元素
    const toast = document.createElement("div");

    // 获取 DOM节点对象，将其 outerHTML 嵌入 toast元素的innerHTML
    const IconDOM = getComponentRootDom(Icon, { type: type })

    toast.innerHTML = `<span class="${styles.icon}">${IconDOM.outerHTML}</span><div>${content}</div>`

    console.log(styles)
    // 设置样式
    // 1. styles.toast
    // 2. type的分类样式 styles[`toast-${type}`]
    toast.className = `${styles.toast} ${styles[`toast-${type}`]}`;

    // 如果容器没传，默认是页面居中
    // if (!container) container = document.body;

    // 因为 toast 提示肯定是要绝对定位，需要容器不能是 static 默认的 position
    if (getComputedStyle(container).position === "static") {
        container.style.position = "relative"
    }

    container.appendChild(toast)

    // 浏览器强行渲染
    toast.clientHeight; // 导致reflow

    // 回归到正常位置
    toast.style.opacity = 1;
    toast.style.transform = `translate(-50%, -50%)`;

    // 等一段时间，消失
    setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.transform = `translate(-50%, -50%) translateY(-25px)`;
        toast.addEventListener(
            "transitionend",
            function () {
                toast.remove();
                // 运行回调函数
                options.callback && options.callback();
            },
            { once: true }, // 确保事件只触发一次
        );
    }, duration);
}