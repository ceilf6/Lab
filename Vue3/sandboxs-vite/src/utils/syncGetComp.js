import { ErrorComp, Loading } from '../components'
import { defineAsyncComponent, h } from 'vue'

export default (path, errorMsg = "加载出错了！") => defineAsyncComponent({
    loader: async () => {
        console.log("开始异步加载组件");
        // await setTimeout(() => {}, 3000); // setTimeout 返回的是定时器
        await new Promise((resolve) => {
            // 应该包在一个 Promise 中 await
            setTimeout(resolve, 3000);
        });
        return await import(path) // "../../test/Block5.vue");
    },
    loadingComponent: Loading, // loader 的 Promise 在 pending 状态时显示的组件
    errorComponent: {
        render() {
            return h(ErrorComp, errorMsg);
        },
    }
});