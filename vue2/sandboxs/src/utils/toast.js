import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon"

/**
 * 弹出消息提示
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info / error / success / warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中：如果不传默认在页面中间
 */
export default function (content, type = "info", duration = 2000, container) {
    // 创建消息元素
    const toast = document.createElement("div");

    // 获取 DOM节点对象，将其 innerHTML 嵌入 toast元素的innerHTML
    const IconDOM = getComponentRootDom(Icon, { type: type })

    toast.innerHTML = `<span>${IconDOM.innerHTML}<div>${content}</div></span>`

    // 如果容器没传，默认是页面居中
    if (!container) container = document.body;

    // 因为 toast 提示肯定是要绝对定位，需要容器不能是 static 默认的 position
    if (getComputedStyle(container).position === "static") {
        container.style.position = "relative"
    }

    container.appendChild(toast)

    setTimeout(() => {
        toast.remove();
    }, duration);
}