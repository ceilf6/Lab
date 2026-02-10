import delay from './delay'
import { start, done, configure } from "nprogress"
import 'nprogress/nprogress.css'

configure({
    tickleSpeed: 16,
    showSpinner: false,
})

/**
 * 
 * @param {*} getWay 获取目标组件的执行语句，例如 () => import('./Comp') 
 * @returns 
 */
export default function syncGetComp(getWay) {
    return async () => {
        console.log('开始加载')
        start()
        if (process.env.NODE_ENV === 'development') await delay(2000)
        // process 正常来说只有 Node.js 有，但是 Vue-cli 自动挂载 var 了
        const comp = await getWay()
        console.log("加载结束")
        done()
        return comp
    }
}