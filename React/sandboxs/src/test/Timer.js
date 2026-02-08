import React, { useEffect, useState } from "react";

export default function Timer() {
    let [cnt, setCnt] = useState(1)

    useEffect(() => {
        const timer = setInterval(() => {
            console.log("=== 副作用仍然存活，观察是否加快")
            // 如果不设置依赖项的话，只要视图更新了就会执行副作用
        }, 1000)

        return (() => {
            console.log("=== 副作用函数清理了")
            clearInterval(timer)
        })
    }) // 或者设置依赖为空数组就只会执行一次副作用了

    const handleClick = () => {
        setCnt(pre => pre + 1)
        // 如果是 setCnt(cnt+1) 会有闭包风险
    }

    return (
        <button onClick={handleClick}>Component {cnt}</button>
    )
}